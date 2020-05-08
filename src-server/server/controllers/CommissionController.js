import { Commission } from '../models';
import { validString } from '../utils';

export const DEFAULT_COMMISSION = {
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
      title,
      recommendationsCommission,
      directHireCommission,
      bidsCommission,
      handlingPercent,
      handlingPlus,
      id,
    } = req.body;

    const error = {
      ...validString(title),
      ...validString(recommendationsCommission),
      ...validString(directHireCommission),
      ...validString(bidsCommission),
      ...validString(handlingPercent),
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
        title,
        recommendationsCommission,
        directHireCommission,
        bidsCommission,
        handlingPercent,
        handlingPlus,
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
};

export default CommissionController;
