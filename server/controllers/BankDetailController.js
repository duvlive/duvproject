import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BankDetail } from '../models';
import Authentication from '../middleware/authentication';
import { validString } from '../utils';

const BankDetailController = {
  /**
   * create BankDetail
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createBankDetail(req, res) {
    const { userId } = req.decoded;
    const { accountName, bankName, accountNumber } = req.body;
    const error = {...validString(accountName),
      ...validString(bankName),
      ...validString(accountNumber),
    };

    return BankDetail.findAll({
      where: { userId }
    }).then((existingBankDetail) => {
    if (existingBankDetail.length > 0) {
      throw {status: 409, message: 'This user already has a bank detail'};
    }
      return BankDetail
        .create({
          accountName, bankName, accountNumber, userId
          });
    }).then((newAccountDetail) => {
      return res.status(200).json({
        message: 'Bank Detail added successfully',
        bankDetail: newAccountDetail,
      });
    }).catch((error) => {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage});
    });
  },

  /**
   * update user BankDetail
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserBankDetail(req, res) {
    const { userId } = req.decoded;
    const { accountNumber } = req.body;
    const error = {...validString(accountNumber)};

    BankDetail.findOne({
      where: { userId }
    })
    .then((bankDetail) => {
      if(!bankDetail || bankDetail.length === 0) {
        return res.status(404).json({ message: 'Bank Detail not found' });
      }

      return bankDetail.update({ accountNumber })
      .then(() => res.status(200).json({ message: 'Bank Detail updated successfully' }));
    }).catch((error) => {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage});
    });
  },
};

export default BankDetailController;
