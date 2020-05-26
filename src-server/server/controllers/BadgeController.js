import { Badge, BadgeUser } from '../models';
import { validString } from '../utils';

const BadgeController = {
  /**
   * create Badge
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createNewBadge(req, res) {
    const { title, color, description } = req.body;

    const error = {
      ...validString(title),
      ...validString(color),
      ...validString(description),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    return Badge.create({
      color,
      title,
      description,
      adminId: req.user.id,
    })
      .then((badge) => {
        return res.status(200).json({
          message: 'Badge created successfully',
          badge,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage =
          (error.parent && error.parent.detail) || error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * assign Badge
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  assignBadgeToUser(req, res) {
    const { userId, badgeId } = req.body;

    if (!userId || !badgeId) {
      return res
        .status(400)
        .json({ message: 'Badge ID and UserId needed to process' });
    }

    return BadgeUser.create({
      userId,
      badgeId,
    })
      .then((badge) => {
        return res.status(200).json({
          message: 'Badge created successfully',
          badge,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage =
          (error.parent && error.parent.detail) || error.message || error;
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
  getBadges(req, res) {
    const userId = req.user.id;
    return BadgeUser.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Badge,
          as: 'badge',
        },
      ],
    })
      .then((badges) => res.json({ badges }))
      .catch((error) => res.status(412).json({ message: error.message }));
  },
};

export default BadgeController;
