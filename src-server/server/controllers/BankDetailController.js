import { validString, updateUser } from '../utils';

const BankDetailController = {
  /**
   * create BankDetail
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserBankDetail(req, res) {
    const { userId } = req.decoded;
    const { accountName, bankName, accountNumber } = req.body;

    const error = {
      ...validString(accountName),
      ...validString(bankName),
      ...validString(accountNumber)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    return updateUser(
      req.user,
      {
        accountName,
        bankName,
        accountNumber,
        userId
      },
      'BankDetail'
    )
      .then(newAccountDetail => {
        return res.status(200).json({
          message: 'Bank Detail added successfully',
          bankDetail: newAccountDetail
        });
      })
      .catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get BankDetail
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserBankDetail(req, res) {
    req.user.getBankDetail().then(bankDetail => {
      if (!bankDetail || bankDetail.length === 0) {
        return res.status(404).json({ message: 'Bank Detail not found' });
      }
      return res.status(200).json({ bankDetail });
    });
  }
};

export default BankDetailController;
