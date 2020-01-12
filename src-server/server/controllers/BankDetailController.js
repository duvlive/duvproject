import { BankDetail, User } from '../models';
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

    User.findOne({ where: { id: userId }})
    .then(user => {
      if(!user) {
        error['user'] = 'user not found';
      }
    })

    if (Object.keys(error).length) {
      return res.status(400).json(error);
    }

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

  // GetUserAccountName
  getUserBankDetail(req,res) {
    const { userId } = req.decoded;

    BankDetail.findOne({
      where: { userId }
    })
    .then((bankDetail) => {
      if(!bankDetail || bankDetail.length === 0) {
        return res.status(404).json({ message: 'Bank Detail not found' });
      }
      return res.status(200).json({ bankDetail});

    })
  },
};

export default BankDetailController;
