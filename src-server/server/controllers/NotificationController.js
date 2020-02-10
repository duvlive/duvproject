import { Notification } from '../models';

const NotificationController = {
  /**
   * create Notification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createNotification({ title, description, type }) {
    if (!title && !description && !type) {
      return Promise.reject({
        message: 'Notification must contain title, description and title'
      });
    }

    return Notification.create({
      title,
      description,
      type
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
      order: [['updatedAt', 'DESC']]
    })
      .then(result => res.json(result))
      .catch(error => res.status(412).json({ msg: error.message }));
  }
};

export default NotificationController;
