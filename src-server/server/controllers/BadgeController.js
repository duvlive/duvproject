import { Badge } from '../models';
import { validString } from '../utils';
import constant from '../constant';

const BadgeController = {
  /**
   * create Badge
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  userBadge(req, res) {
    const {
      title,
      icon
    } = req.body;

    const error = {
      ...validString(title),
      ...validString(icon)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newBadge = {}
      return Badge.create({
				title,
				icon,
        userId: req.user.id
      })
        .then(badge => {
          newBadge = badge;
          return req.user.addBadge(badge);
        })
        .then(() => {
          return res
            .status(200)
            .json({
              message: 'Badge created successfully',
              badge: newBadge
            })
        })
        .catch(error => {
          const status = error.status || 500;
          const errorMessage = (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
  },

  /**
   * get Badge
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserBadges(req, res) {
    req.user.getBadges().then(badges => {
      if (!badges || badges.length === 0) {
        return res.status(404).json({ message: 'Badge not found' });
      }
      return res.status(200).json({ badges });
    });
  }
};

export default BadgeController;
