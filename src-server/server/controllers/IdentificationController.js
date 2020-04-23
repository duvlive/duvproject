import { validString, updateUser } from '../utils';

const IdentificationController = {
  /**
   * update Entertainer Identification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateEntertainerIdentification(req, res) {
    const { idType, idNumber, issueDate, expiryDate } = req.body;

    const error = {
      ...validString(idType),
      ...validString(idNumber),
      ...validString(issueDate),
      ...validString(expiryDate),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    return updateUser(
      req.user,
      {
        idType,
        idNumber,
        issueDate,
        expiryDate,
        userId: req.user.id,
      },
      'Identification'
    )
      .then((newIdentification) => {
        return res.status(200).json({
          message: 'Entertainer Identification updated succesfully',
          identification: newIdentification,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },
  /**
   * get Identification
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getIdentification(req, res) {
    req.user.getIdentification().then((identification) => {
      if (!identification || identification.length === 0) {
        return res
          .status(404)
          .json({ message: 'Entertainer identification not found' });
      }
      return res.status(200).json({ identification });
    });
  },
};

export default IdentificationController;
