import Sequelize, { Op } from 'sequelize';
import { Event } from '../models';
import { validString } from '../utils';
import {
  EventEntertainer,
  User,
  EntertainerProfile,
  Application,
  Rating,
} from '../models';

const EventController = {
  /**
   * create Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserEvent(req, res) {
    const {
      eventType,
      eventDate,
      startTime,
      eventDuration,
      moreInformation,
      streetLine1,
      streetLine2,
      state,
      lga,
      city,
      landmark,
      description,
      id,
    } = req.body;

    const error = {
      ...validString(eventType),
      ...validString(eventDate),
      ...validString(startTime),
      ...validString(eventDuration),
      ...validString(moreInformation),
      ...validString(streetLine1),
      ...validString(streetLine2),
      ...validString(state),
      ...validString(lga),
      ...validString(city),
      ...validString(landmark),
      ...validString(description),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newEvent = {};
    if (!id) {
      return Event.create({
        eventType,
        eventDate,
        startTime,
        eventDuration,
        moreInformation,
        streetLine1,
        streetLine2,
        state,
        lga,
        city,
        landmark,
        description,
        userId: req.user.id,
      })
        .then((event) => {
          newEvent = event;
          return req.user.addEvent(event);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Event created successfully',
            event: newEvent,
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return req.user
      .getEvents({ where: { id } })
      .then((events) => {
        if (events && events.length > 0) {
          return events[0].update({
            eventType,
            eventDate,
            startTime,
            eventDuration,
            moreInformation,
            streetLine1,
            streetLine2,
            state,
            lga,
            city,
            landmark,
            description,
          });
        }
        throw `No Event with id ${id}`;
      })
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
   * event one details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEvent(req, res) {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ message: 'Kindly provide an event id' });
    }
    Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: EventEntertainer,
          as: 'entertainers',
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about',
              ],
              include: [
                {
                  model: User,
                  as: 'personalDetails',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'profileImageURL',
                  ],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
      ],
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        return res.json({ event });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * get Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserEvent(req, res) {
    req.user.getEvents().then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  },

  /**
   * get User Auction
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserAuctions(req, res) {
    EventEntertainer.findAll({
      where: {
        hireType: 'Auction',
        userId: req.user.id,
        hiredEntertainer: null, // shown auctions with no hired Entertainer
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: EntertainerProfile,
          as: 'entertainer',
          attributes: [
            'id',
            'stageName',
            'entertainerType',
            'location',
            'about',
          ],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: Application,
          as: 'applications',
        },
      ],
    }).then((auctions) => {
      if (!auctions || auctions.length === 0) {
        return res.status(404).json({ message: 'Auction not found' });
      }
      return res.status(200).json({ auctions });
    });
  },

  /**
   * get User Requests
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserRequests(req, res) {
    const userId = req.user.id;
    Application.findAll({
      where: {
        applicationType: 'Request',
      },
      include: [
        {
          model: Event,
          as: 'event',
          where: {
            userId,
          },
        },
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          where: {
            hiredEntertainer: null, // shown requests with no hired Entertainer
          },
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'profileImageURL'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName', 'slug'],
            },
          ],
        },
      ],
    }).then((requests) => {
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'No request found' });
      }
      return res.status(200).json({ requests });
    });
  },

  /**
   * get Available Auctions
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAvailableAuctions(req, res) {
    EventEntertainer.findAll({
      where: {
        hireType: 'Auction',
        auctionStartDate: { [Op.lte]: Sequelize.literal('NOW()') },
        auctionEndDate: { [Op.gte]: Sequelize.literal('NOW()') },
        entertainerType: {
          [Op.eq]: req.user.profile.entertainerType,
        },
        [Op.and]: Sequelize.literal('applications.id is null'), // only auctions without applications should be shown
      },
      include: [
        {
          model: Event,
          as: 'event',
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: Application,
          as: 'applications',
          where: { userId: req.user.id },
          required: false,
        },
      ],
    }).then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  },

  /**
   * get One Event for Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEntertainerEvent(req, res) {
    const userId = req.user.id;
    const id = req.params.id;
    EntertainerProfile.findOne({
      where: {
        userId,
      },
    })
      .then((entertainer) => {
        EventEntertainer.findOne({
          where: {
            id,
            hiredEntertainer: entertainer.id,
          },
          include: [
            {
              model: Event,
              as: 'event',
              include: [
                {
                  model: User,
                  as: 'owner',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'phoneNumber',
                    'phoneNumber2',
                    'profileImageURL',
                  ],
                },
              ],
            },
          ],
        })
          .then((event) => {
            if (!event) {
              return res.status(404).json({ message: 'Event not found' });
            }
            return res.status(200).json({ event });
          })
          .catch((error) => {
            const errorMessage = error.message || error;
            return res.status(412).json({ message: errorMessage });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * get Entertainer Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerEvents(req, res) {
    const userId = req.user.id;
    EntertainerProfile.findOne({
      where: {
        userId,
      },
    }).then((entertainer) => {
      EventEntertainer.findAll({
        where: {
          hiredEntertainer: entertainer.id,
        },
        include: [
          {
            model: Event,
            as: 'event',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
              },
            ],
          },
        ],
      }).then((events) => {
        if (!events || events.length === 0) {
          return res.status(404).json({ message: 'Events not found' });
        }
        return res.status(200).json({ events });
      });
    });
  },

  /**
   * get Pending Event Review
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getPendingEventReviews(req, res) {
    const userId = req.user.id;
    EventEntertainer.findAll({
      where: {
        userId,
        hiredEntertainer: {
          [Op.ne]: null,
        },
        // [Op.and]: Sequelize.literal(`"eventRating"."id" is null`),
      },
      order: [Sequelize.fn('RANDOM')],
      attributes: ['id', 'placeOfEvent'],
      include: [
        {
          model: Event,
          as: 'event',
          where: {
            eventDate: {
              [Op.lte]: Sequelize.literal('NOW()'),
            },
          },
          attributes: ['id', 'eventDate', 'eventType', 'eventDuration'],
        },
        {
          model: EntertainerProfile,
          as: 'entertainer',
          attributes: [
            'id',
            'slug',
            'stageName',
            'entertainerType',
            'location',
          ],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: ['id', 'profileImageURL'],
            },
          ],
        },
        {
          model: Rating,
          as: 'eventRating',
        },
      ],
    }).then((info) => {
      if (!info || info.length === 0) {
        return res
          .status(404)
          .json({ message: 'Event Entertainers not found' });
      }
      return res.status(200).json({ info });
    });
  },

  /**
   * get Event Bids (for user)
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEventBids(req, res) {
    const eventEntertainerId = req.params.id;
    if (!eventEntertainerId) {
      return res
        .status(400)
        .json({ message: 'Kindly provide an event entertainer id' });
    }
    EventEntertainer.findOne({
      where: {
        id: eventEntertainerId,
        userId: req.user.id,
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
        {
          model: Application,
          as: 'applications',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
              include: [
                {
                  model: EntertainerProfile,
                  as: 'profile',
                  attributes: [
                    'id',
                    'stageName',
                    'entertainerType',
                    'location',
                    'about',
                  ],
                },
              ],
            },
          ],
        },
      ],
    }).then((eventEntertainer) => {
      if (!eventEntertainer) {
        return res.status(404).json({ message: 'Event Entertainer not found' });
      }

      if (eventEntertainer.hiredEntertainer) {
        return res
          .status(400)
          .json({ message: 'An entertainer has already been hired' });
      }
      return res.status(200).json({ eventEntertainer });
    });
  },

  /**
   * get Auction Details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getAuctionDetails(req, res) {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ message: 'Kindly provide an event id' });
    }
    Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: EventEntertainer,
          as: 'entertainers',
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about',
              ],
              include: [
                {
                  model: User,
                  as: 'personalDetails',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'profileImageURL',
                  ],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
        },
      ],
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        return res.json({ event });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },
};

export default EventController;
