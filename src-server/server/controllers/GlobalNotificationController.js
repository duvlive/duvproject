import { GlobalNotification, User } from '../models';
import { validString } from '../utils';

const GlobalNotificationController = {
  /**
   * create and Update Global Notification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createAndUpdateGlobalNotification(req, res) {
    const {
      message,
      entertainerType,
      userType,
      startTime,
      endTime,
      id,
    } = req.body;

    const error = {
      ...validString(message),
      ...validString(entertainerType),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newNotification = {};
    if (!id) {
      return GlobalNotification.create({
        message,
        entertainerType,
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
            entertainerType,
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
   * get Global Notifications
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getGlobalNotifications(req, res) {
    GlobalNotification.findAll({
      include: {
        model: User,
        as: 'adminUser',
        attributes: ['id', 'firstName', 'lastName'],
      },
    }).then((globalNotification) => {
      if (!globalNotification || globalNotification.length === 0) {
        return res
          .status(404)
          .json({ message: 'Global Notification not found' });
      }
      return res.status(200).json({ globalNotification });
    });
  },
};

export default GlobalNotificationController;
