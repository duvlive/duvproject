import { User } from '../models';

const UserController = {
  /**
  * transformUser
  * @function
  * @param {object} user
  * @return {object} returns newUser
  */
 transformUser(user) {
   const newUser = {
     id: user.id,
     firstName: user.firstName,
     lastName: user.lastName,
     email: user.email,
     phoneNumber1: user.phoneNumber1,
     type: user.type,
     isActive: user.isActive,
   };
   return newUser;
 },
  /**
   * create User
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createUser(req, res) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { firstName, lastName, email, password, confirmPassword,
      phoneNumber1, type } = req.body;

    if (!firstName, !lastName, !email, !password, !confirmPassword,
      !phoneNumber1) {
        return res.status(400).json({
          message: 'Please fill all the fields'
        });
      }

    if (firstName.length < 3) {
      return res.status(400).json({
        message: 'Firstname length must have a minimum of 3 characters'
      });
    }

    if (lastName.length < 3) {
      return res.status(400).json({
        message: 'Lastname length must have a minimum of 3 characters'
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Email is not rightly formatted',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password length must have a minimum of 8 characters'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    if (phoneNumber1.length < 11 && phoneNumber1.length > 14) {
      return res.status(400).json({
        message: 'Phone Number length must be between 11 and 14 characters'
      });
    }

    return User.findAll({
      where: { email }
    }).then((existingUser) => {
        if (existingUser.length > 0) {
          return res.status(409).json({ message:
              'User already exists' });
        }
      return User
        .create({
          firstName, lastName, email, password, phoneNumber1, type
          });
        }).then((newUser) => {
      return res.status(200).json({
        message: 'Signed up successfully',
        user: UserController.transformUser(newUser),
      });
    }).catch((error) => {
      const errorMessage = error.message || error;
      return res.status(500).json({ message: errorMessage});
    });
  },

  /**
   * activate User
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  activateUser(req, res) {
    User.findOne({
      where: { token: req.query.token }
    })
    .then((userFound) => {
      if(userFound.length === 0 ) {
        return res.status(404).json({ message: 'Token expired'});
      }
      if (userFound.isActive) {
        return res.status(403).json({ message: 'User already Activated'});
      }

      return User.update({ isActive: true }, {
        where: {
          token: req.query.token
        }
      })
      .then(() => res.status(200).json({ message: 'User activation successful' }));
    })
    .catch((error) => {
      const errorMessage = error.message || error;
      return res.status(500).json({ message: errorMessage });
    });
  }
};

export default UserController;