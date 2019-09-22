import bcrypt from 'bcrypt';
import { User } from '../models';
import emailSender from '../MailSender';

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
  },

  /**
   * user login
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  userLogin(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Email and password cannot be empty'});
    }
    User.findOne({
      where: { email }
    })
    .then((user) => {
      if (user.length === 0 || !user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.isActive) {
        return res.status(403).json({ message: 'User needs to activate account' });
      }
      if(!bcrypt.compareSync(password, user.password)) {
        return res.status(403).json({ message: "Incorrect login detail"});
      }
      else {
        return res.status(200).json({
          message: 'You are successfully Logged in',
        });
      }
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
  },

  /**
   * password reset
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  passwordReset(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email cannot be empty'});
    }

    User.findOne({
      where: { email }
    })
    .then((user) => {
      if(!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      else {
        const title = 'Password Recovery | DUV LIVE';
        emailSender(email, user.token, title).catch(console.error);
        return res.status(200).json({
          message: 'Password reset email sent successfully' });
      }
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
  },

  /**
  * update password
  * @function
  * @param {object} req is req object
  * @param {object} res is res object
  * @return {object} returns res object
  */
  updatePassword(req, res) {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill both fields, cannot be empty'});
    }

    User.findOne({
      where: { token: req.query.token }
    })
    .then((user) => {
      if(!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      if(password !== confirmPassword) {
        return res.status(403).json({ message: "Passwords do not match"});
      }

      return user.update({ password })
      .then(() => res.status(200).json({ message: 'Password update successful' }));
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
  }
};

export default UserController;