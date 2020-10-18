import Sequelize, { Op } from 'sequelize';
import { PublicEvent, User } from '../models';
import { validString, getAll } from '../utils';
import { MEDIA_TYPES } from '../constant';

export const slugify = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const randomString = Date.now().toString().slice(-5);
  return `${slug}-${randomString}`;
};

const PublicEventController = {
  /**
   * create Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserEvent(req, res) {
    const {
      description,
      id,
      title,
      location,
      mainImage,
      organizer,
      startTime,
      endTime,
      eventLink,
      venue,
      city,
      state,
    } = req.body;

    const error = {
      ...validString(description),
      ...validString(title),
      ...validString(location),
      ...validString(mainImage),
      ...validString(organizer),
      ...validString(startTime),
      ...validString(endTime),
      ...validString(venue),
      ...validString(eventLink),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    const userId = req.user.id;

    if (!id) {
      // Create Event
      const slug = slugify(title);
      return PublicEvent.create({
        city,
        description,
        endTime,
        slug,
        title,
        location,
        mainImage,
        eventLink,
        organizer,
        startTime,
        state,
        userId,
        venue,
      })
        .then((event) => {
          return res.status(200).json({
            event,
            message: 'Event created successfully',
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }

    // Update Event
    return PublicEvent.update(
      {
        city,
        description,
        endTime,
        title,
        location,
        mainImage,
        eventLink,
        organizer,
        startTime,
        status: null,
        state,
        venue,
      },
      { where: { id, userId: req.user.id } }
    )
      .then((event) => {
        return res.status(200).json({
          message: 'Event updated successfully',
          event,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * @desc Get all Public Events
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getUserPublicEvents(req, res) {
    const { userId } = req.decoded;
    return PublicEvent.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    })
      .then((publicEvents) => {
        return res.json({ publicEvents });
      })
      .catch((error) => res.status(412).json({ msg: error.message }));
  },

  /**
   * @desc Get non user  Public Events
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getOtherUsersPublicEvents(req, res) {
    const { userId } = req.decoded;

    const { offset, limit } = req.query;

    try {
      const options = {
        offset: offset || 0,
        limit: limit || 15,
        where: {
          status: true,
          userId: {
            [Op.ne]: userId,
          },
          endTime: { [Op.gte]: Sequelize.literal('NOW()') },
        },
        order: [['startTime', 'ASC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(PublicEvent, options);
        return res.status(200).json({
          result,
          pagination,
        });
      } catch (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * approve status
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateStatus(req, res) {
    const { id, approve } = req.params;
    const approveEvent = approve === 'approve';
    const approval = {
      value: approveEvent,
      type: approveEvent ? 'approved' : 'disapproved',
    };

    PublicEvent.findOne({
      where: { id },
    })
      .then((foundEvent) => {
        if (!foundEvent) {
          return res.status(404).json({ message: 'Event does not exist' });
        }

        return PublicEvent.update(
          { status: approval.value },
          {
            where: {
              id,
            },
          }
        ).then(() =>
          res.status(200).json({ message: `Event has been ${approval.type}` })
        );
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * @desc get publicEvent
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getPublicEventsForAdmin(req, res) {
    const { offset, limit, userId, status } = req.query;

    try {
      let publicEventQuery = {};
      if (userId) {
        publicEventQuery.userId = userId;
      }
      if (status && Object.prototype.hasOwnProperty.call(MEDIA_TYPES, status)) {
        publicEventQuery.status = MEDIA_TYPES[status];
      }
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: publicEventQuery,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(PublicEvent, options);
        return res.status(200).json({
          result,
          pagination,
        });
      } catch (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * @desc get publicEvent
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getPublicEventsForFrontend(req, res) {
    const { offset, limit, startTime } = req.query;

    let whereQuery = {};
    const publicEventsStaticKeys = ['state'];

    publicEventsStaticKeys.forEach((key) => {
      if (req.query[key]) {
        whereQuery[key] = req.query[key];
      }
    });
    if (startTime) {
      whereQuery.startTime = { [Op.gte]: startTime };
    }
    try {
      const options = {
        offset: offset || 0,
        limit: limit || 15,
        where: {
          status: true,
          endTime: { [Op.gte]: Sequelize.literal('NOW()') },
          ...whereQuery,
        },
        order: [['startTime', 'ASC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(PublicEvent, options);
        return res.status(200).json({
          result,
          pagination,
        });
      } catch (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  getPublicEventBySlug(req, res) {
    const { slug } = req.params;
    if (!slug) {
      return res
        .status(401)
        .json({ message: 'Invalid URL. Entertainer not found.' });
    }

    const userModel = {
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
    };

    PublicEvent.findOne({
      where: { slug },
      include: [userModel],
    })
      .then((event) => {
        PublicEvent.findAll({
          order: [Sequelize.fn('RANDOM')],
          limit: 3,
          where: {
            [Op.and]: [
              { status: true },
              {
                slug: { [Op.ne]: slug },
              },
              { endTime: { [Op.gte]: Sequelize.literal('NOW()') } },
            ],
          },
          include: [userModel],
        }).then(async (otherEvents) => {
          if (!event) {
            return res
              .status(401)
              .json({ message: 'Event not found.', otherEvents });
          }
          return res.status(200).json({
            message: 'Entertainer detail',
            event: { ...event.toJSON() },
            otherEvents,
          });
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  getPublicEventByID(req, res) {
    const { id } = req.params;

    const userModel = {
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
    };

    PublicEvent.findOne({
      where: { id },
      include: [userModel],
    })
      .then((event) => {
        if (!event) {
          return res.status(401).json({ message: 'Event not found.' });
        }
        return res.status(200).json({
          message: 'Entertainer detail',
          event,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },
};

export default PublicEventController;
