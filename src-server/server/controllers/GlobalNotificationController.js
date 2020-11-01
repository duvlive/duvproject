import { GlobalNotification, User } from '../models';
import { validString, getAll } from '../utils';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

const GlobalNotificationController = {
  /**
   * create and Update Global Notification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createAndUpdateGlobalNotification(req, res) {
    const { color, message, userType, startTime, endTime, id } = req.body;

    const error = {
      ...validString(message),
      // ...validString(entertainerType),
      ...validString(color),
    };

    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newNotification = {};
    if (!id) {
      return GlobalNotification.create({
        message,
        color,
        entertainerType: 'All',
        userType,
        startTime,
        endTime,
        adminId: req.user.id,
      })
        .then((notification) => {
          newNotification = notification;
          return req.user.addGlobalNotification(notification);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Your notification was created successfully',
            globalNotification: newNotification,
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
      .getGlobalNotifications({
        where: { id },
      })
      .then((globalNotification) => {
        if (globalNotification && globalNotification.length > 0) {
          return globalNotification[0].update({
            message,
            color,
            entertainerType: 'All',
            userType,
            startTime,
            endTime,
          });
        }
        throw `No Global Notification with id ${id}`;
      })
      .then((globalNotification) => {
        return res.status(200).json({
          message: 'Global Notification updated successfully',
          globalNotification,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * @desc get global notification
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getGlobalNotifications(req, res) {
    const { offset, limit, showAll } = req.query;
    let where = {};

    if (!showAll) {
      where = {
        endTime: { [Op.gte]: Sequelize.literal('NOW()') },
      };
    }

    try {
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where,
        include: [
          {
            model: User,
            as: 'adminUser',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(
          GlobalNotification,
          options
        );
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
   * get Global Notifications
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserGlobalNotification(req, res) {
    let where = {
      startTime: { [Op.lte]: Sequelize.literal('NOW()') },
      endTime: { [Op.gte]: Sequelize.literal('NOW()') },
      [Op.or]: [
        {
          userType: req.user.type,
        },
        {
          userType: 1000, // 1000 is used for all user types
        },
      ],
    };
    GlobalNotification.findOne({
      where,
      order: [['startTime', 'ASC']],
    }).then((globalNotification) => {
      return res.status(200).json({ globalNotification });
    });
  },
};

export default GlobalNotificationController;
