import { Notification } from '../models';

const NotificationController = {
  /**
   * create Notification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createNotification({ title, description, type, userId = 1 }) {
    if (!title && !description && !type && !userId) {
      return Promise.reject({
        message:
          'Notification must contain title, description, type and userId',
      });
    }

    return Notification.create({
      description,
      title,
      type,
      userId,
    });
  },

  /**
   * @desc Get all Nofications
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getNotifications(req, res) {
    const { userId } = req.decoded;
    return Notification.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']],
    })
      .then((notifications) => {
        return Notification.update(
          {
            status: 1,
          },
          {
            where: { userId },
          }
        )
          .then(() => {
            return res.json({ notifications });
          })
          .catch((error) => {
            const status = error.status || 500;
            const errorMessage = error.message || error;
            return res.status(status).json({ message: errorMessage });
          });
      })
      .catch((error) => res.status(412).json({ msg: error.message }));
  },
};

export default NotificationController;
