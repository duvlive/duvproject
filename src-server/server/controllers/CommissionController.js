import { Op } from 'sequelize';
import { Commission, User } from '../models';
import { validString } from '../utils';
import { getAll } from '../utils';

export const DEFAULT_COMMISSION = {
  id: null,
  title: 'Default Commission',
  recommendationsCommission: '15',
  directHireCommission: '6',
  bidsCommission: '10',
  handlingPercent: '2',
  handlingPlus: '40',
};

const CommissionController = {
  /**
   * create Event Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateCommission(req, res) {
    const {
      bidsCommission,
      deactivated,
      directHireCommission,
      handlingPercent,
      handlingPlus,
      id,
      recommendationsCommission,
      title,
    } = req.body;

    const error = {
      ...validString(bidsCommission),
      ...validString(deactivated),
      ...validString(directHireCommission),
      ...validString(handlingPercent),
      ...validString(title),
      ...validString(recommendationsCommission),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    if (!id) {
      return Commission.create({
        title,
        recommendationsCommission,
        directHireCommission,
        bidsCommission,

        handlingPercent,
        handlingPlus,
      })
        .then((commission) => {
          return res.status(200).json({
            message: 'Commission has been created successfully',
            commission,
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return Commission.update(
      {
        bidsCommission,
        deactivated,
        directHireCommission,
        handlingPercent,
        handlingPlus,
        recommendationsCommission,
        title,
      },
      {
        where: { id },
      }
    )
      .then((commission) => {
        return res.status(200).json({
          message: 'Commission updated successfully',
          commission,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get one commission
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getDefaultCommission(req, res) {
    Commission.findOne({
      where: { default: true },
    })
      .then((commission) => {
        return res.json({
          commission: commission || DEFAULT_COMMISSION,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * set as default Commission
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  setAsDefaultCommission(req, res) {
    const commissionId = req.body.id;
    if (commissionId) {
      Commission.findOne({
        where: { id: commissionId },
      })
        .then((commission) => {
          if (!commission) {
            return res.status(404).send({
              message: 'Commission not found',
            });
          }
          // update profile image in database
          return commission
            .update({
              default: true,
            })
            .then(async () => {
              await Commission.update(
                {
                  default: false,
                },
                {
                  where: { id: { [Op.ne]: commissionId } },
                }
              );
              return res.json({
                message: 'Commission has been successfully set as default',
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } else {
      return res.status(412).json({ message: 'Commission id cannot be empty' });
    }
  },
  /**
   * @desc get commissions
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  async getCommission(req, res) {
    const { offset, limit } = req.query;

    try {
      const options = {
        offset: offset || 0,
        limit: limit || 10,
        order: [
          ['default', 'DESC'],
          ['title', 'ASC'],
        ],
      };
      try {
        const { result, pagination } = await getAll(Commission, options);
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
   * get All Commission List
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getAllCommissionsList(req, res) {
    try {
      const options = {
        limit: 0,
        attributes: ['id', 'title'],
      };
      try {
        const { result } = await getAll(Commission, options);
        return res.status(200).json({
          commissions: result.map((commission) => ({
            value: commission.id,
            label: commission.title,
          })),
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },

  /**
   * assign Commission to User
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  assignCommissionToUser(req, res) {
    const { userId, commissionId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'UserId needed to process' });
    }

    return User.update(
      {
        commissionId: commissionId || null,
      },
      {
        where: { id: userId },
      }
    )
      .then(() => {
        return res.status(200).json({
          message: 'Commission has been succesfully assigned',
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage =
          (error.parent && error.parent.detail) || error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },
};

export default CommissionController;
