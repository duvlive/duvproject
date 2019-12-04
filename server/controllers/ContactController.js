// import { Contact } from '../models';
// import { validString } from '../utils';

// const ContactController = {
//   /**
//    * create Contact
//    * @function
//    * @param {object} req is req object
//    * @param {object} res is res object
//    * @return {object} returns res object
//    */
//   createContact(req, res) {
//     const { userId } = req.decoded;
//     const { firstName, lastName, email, phoneNumber, relationship } = req.body;
//     const error = {...validString(firstName),
//       ...validString(lastName),
//       ...validString(accountNumber),
//     };

//     const error = {...UserValidation.nameValidation(firstName, lastName),
//       ...UserValidation.emailValidation(email),
//       ...UserValidation.phoneNumberValidation(phoneNumber),
//       ...UserValidation.passwordValidaton(password, confirmPassword)
//     };

//     return Contact.findAll({
//       where: { userId }
//     }).then((existingBankDetail) => {
//     if (existingBankDetail.length > 0) {
//       throw {status: 409, message: 'This user already has a bank detail'};
//     }
//       return Contact
//         .create({
//           accountName, bankName, accountNumber, userId
//           });
//     }).then((newAccountDetail) => {
//       return res.status(200).json({
//         message: 'Bank Detail added successfully',
//         bankDetail: newAccountDetail,
//       });
//     }).catch((error) => {
//       const status = error.status || 500;
//       const errorMessage = error.message || error;
//       return res.status(status).json({ message: errorMessage});
//     });
//   },

//   /**
//    * update user Contact
//    * @function
//    * @param {object} req is req object
//    * @param {object} res is res object
//    * @return {object} returns res object
//    */
//   updateUserBankDetail(req, res) {
//     const { userId } = req.decoded;
//     const { accountNumber } = req.body;
//     const error = {...validString(accountNumber)};

//     Contact.findOne({
//       where: { userId }
//     })
//     .then((bankDetail) => {
//       if(!bankDetail || bankDetail.length === 0) {
//         return res.status(404).json({ message: 'Bank Detail not found' });
//       }

//       return bankDetail.update({ accountNumber })
//       .then(() => res.status(200).json({ message: 'Bank Detail updated successfully' }));
//     }).catch((error) => {
//       const status = error.status || 500;
//       const errorMessage = error.message || error;
//       return res.status(status).json({ message: errorMessage});
//     });
//   },
// };

// export default ContactController;
