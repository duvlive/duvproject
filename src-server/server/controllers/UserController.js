import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ApprovalComment,
  Badge,
  BadgeUser,
  BankDetail,
  Contact,
  EntertainerProfile,
  Event,
  EventEntertainer,
  Gallery,
  Identification,
  Notification,
  Payment,
  User,
  Video,
} from '../models';
import sendMail from '../MailSender';
import Authentication from '../middleware/authentication';
import { UserValidation, updateUser, validString } from '../utils';
import EMAIL_CONTENT from '../email-template/content';
import { USER_TYPES, NOTIFICATIONS, NOTIFICATION_TYPE } from '../constant';

export const userAssociatedOrder = [
  // ...we use the same syntax from the include
  // in the beginning of the order array
  [{ model: Event, as: 'events' }, 'eventDate', 'ASC'],
];

export const userAssociatedModels = [
  {
    model: EntertainerProfile,
    as: 'profile',
    include: [
      {
        model: Payment,
        as: 'payments',
      },
    ],
  },
  {
    model: BankDetail,
    as: 'bankDetail',
  },
  {
    model: BadgeUser,
    as: 'badges',
    include: [
      {
        model: Badge,
        as: 'badge',
      },
    ],
  },
  {
    model: Contact,
    as: 'contacts',
  },
  {
    model: Gallery,
    as: 'galleries',
    attributes: ['id', 'imageURL', 'imageID', 'approved'],
  },
  {
    model: Video,
    as: 'videos',
    attributes: ['id', 'title', 'youtubeID', 'approved'],
  },
  {
    model: ApprovalComment,
    as: 'approvalComment',
    attributes: [
      'entertainerProfile',
      'bankAccount',
      'contact',
      'identification',
      'youTube',
    ],
  },
  {
    model: Identification,
    as: 'identification',
  },
  {
    model: Event,
    as: 'events',
    include: [
      {
        model: EventEntertainer,
        as: 'entertainers',
        include: [
          {
            model: EntertainerProfile,
            as: 'entertainer',
            attributes: ['id', 'stageName', 'entertainerType', 'location'],
            include: [
              {
                model: User,
                as: 'personalDetails',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
              },
            ],
          },
        ],
      },
    ],
  },
];

const UserController = {
  /**
   * transformUser
   * @function
   * @param {object} user
   * @return {object} returns newUser
   */
  transformUser(user, updatedValues = {}) {
    const transformedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      firstTimeLogin: user.firstTimeLogin,
      phoneNumber: user.phoneNumber,
      phoneNumber2: user.phoneNumber2,
      type: user.type,
      referral: user.referral,
      profileImg: user.profileImageURL,
      entertainerProfile: user.profile,
      approvalComment: user.approvalComment,
      badges: user.badges,
      bankDetail: user.bankDetail,
      contacts: user.contacts,
      events: user.events,
      galleries: user.galleries,
      identification: user.identification,
      ratings: user.ratings,
      videos: user.videos,
    };

    return { ...transformedUser, ...updatedValues };
  },

  /**
   * create User
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  createUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      type,
    } = req.body;
    const errors = {
      ...UserValidation.nameValidation(firstName, lastName),
      ...UserValidation.emailValidation(email),
      ...UserValidation.phoneNumberValidation(phoneNumber),
      ...UserValidation.passwordValidaton(password, confirmPassword),
    };

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ message: 'There are invalid fields in the form', errors });
    }
    return User.findAll({
      where: { email },
    })
      .then((existingUser) => {
        if (existingUser.length > 0) {
          throw {
            status: 409,
            message: 'This email address has already been taken',
          };
        }
        return User.create({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          type,
        });
      })
      .then(async (newUser) => {
        await Notification.create({
          userId: newUser.id,
          title: NOTIFICATIONS.ACCOUNT_CREATED,
          description: 'Your DUV Live account was created',
          type: NOTIFICATION_TYPE.CONTENT,
        });
        return res.status(200).json({
          message: 'Signed up successfully',
          user: UserController.transformUser(newUser),
          token: Authentication.generateToken(newUser, true),
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * complete user registration
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async completeRegistration(req, res) {
    const { id, password, phoneNumber, type } = req.body;
    const errors = {
      ...UserValidation.phoneNumberValidation(phoneNumber),
      ...UserValidation.singlePasswordValidaton(password),
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ message: 'There are invalid fields in the form', errors });
    }
    // updated approved application
    return User.update(
      {
        password: hashedPassword,
        phoneNumber,
        type,
        userId: 999,
        activatedAt: Date.now(),
      },
      {
        where: {
          id,
        },
      }
    )
      .then(async () => {
        if (type === USER_TYPES.ENTERTAINER) {
          [EntertainerProfile, BankDetail, Identification, ApprovalComment].map(
            async (model) => await model.create({ userId: id })
          );
        }
        await Notification.create({
          userId: id,
          title: NOTIFICATIONS.ACCOUNT_CREATED,
          description: 'Your DUV Live account was created',
          type: NOTIFICATION_TYPE.CONTENT,
        });
        return res.json({
          message: 'Registration completed',
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * social login
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  socialLogin(req, res) {
    const { lastName, firstName, email, picture } = req.user;
    if (!email) {
      return res.status(400).json({ error: 'No email found' });
    }
    User.findOne({
      where: { email },
    })
      .then(async (result) => {
        if (!result) {
          const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber: '12345678901',
            password: Date.now().toString(36),
            profileImageURL: picture,
            isActive: true,
            type: 999,
            profileImageID: 'social-media',
          });
          const token = Authentication.generateToken(user);
          res.redirect(`${process.env.HOST}/complete-registration/${token}`);
        } else {
          if (result.firstTimeLogin) {
            await User.update(
              { firstTimeLogin: false },
              { where: { email: result.email } }
            );
          }
          const token = Authentication.generateToken(result);
          res.redirect(`${process.env.HOST}/login/${token}`);
        }
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        return res.status(400).json({ error: errorMessage });
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
      where: { activationToken: req.query.token },
    })
      .then((userFound) => {
        if (!userFound || userFound.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (userFound.isActive) {
          return res
            .status(403)
            .json({ message: 'Your account has been activated' });
        }

        return User.update(
          { isActive: true, activatedAt: new Date().toISOString() },
          {
            where: {
              activationToken: req.query.token,
            },
          }
        ).then(() =>
          res.status(200).json({ message: 'User activation successful' })
        );
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
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email or password cannot be empty' });
    }
    User.findOne({
      where: { email },
      include: userAssociatedModels,
      order: userAssociatedOrder,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Invalid email or password' });
        }

        if (!user.isActive) {
          return res.status(403).json({
            message: 'User needs to activate account.',
          });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(403).json({
            message: 'Invalid email or password',
          });
        }

        const firstTimeLogin = user.firstTimeLogin;
        if (firstTimeLogin) {
          user.update({ firstTimeLogin: false });
        }

        const token = Authentication.generateToken(user);
        return res.status(200).json({
          message: 'You are successfully logged in',
          user: UserController.transformUser(user, {
            firstTimeLogin,
          }),
          token,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * forgot password - generates reset password link
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user || user.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        } else {
          const resetToken = Authentication.generateToken(user);
          const link = `${process.env.HOST}/reset-password/${resetToken}`;
          sendMail(EMAIL_CONTENT.PASSWORD_RESET, user, {
            link,
          });
          return res.status(200).json({
            message: 'Password reset email sent successfully',
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  },

  /**
   * reset password
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  resetPassword(req, res) {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Please fill both fields, cannot be empty' });
    }

    const resetToken = req.query.token;
    jwt.verify(resetToken, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: 'Invalid token',
        });
      }
      req.decoded = decoded;
    });

    User.findOne({
      where: { id: req.decoded.userId },
    })
      .then((user) => {
        if (!user || user.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (password !== confirmPassword) {
          return res.status(403).json({ message: 'Passwords do not match' });
        }

        return user.update({ password }).then(async () => {
          await Notification.create({
            userId: req.decoded.userId,
            title: NOTIFICATIONS.PASSWORD_CHANGED,
            description: 'Your DUV Live account password was changed',
            type: NOTIFICATION_TYPE.INFO,
          });
          sendMail(EMAIL_CONTENT.CHANGE_PASSWORD, user);
          return res
            .status(200)
            .json({ message: 'Password update successful' });
        });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  },

  /**
   * change password
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  changePassword(req, res) {
    const { oldPassword, password, confirmPassword } = req.body;
    const { user } = req;

    if (!password || !confirmPassword || !oldPassword) {
      return res.status(400).json({
        message:
          'The old, current and confirmation password fields cannot be empty',
      });
    }

    if (password !== confirmPassword) {
      return res.status(403).json({ message: 'Passwords do not match' });
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(403).json({
        message: 'Invalid old password',
      });
    }

    return user.update({ password }).then(async () => {
      await Notification.create({
        userId: req.user.id,
        title: NOTIFICATIONS.PASSWORD_CHANGED,
        description: 'Your DUV Live account password was changed',
        type: NOTIFICATION_TYPE.INFO,
      });
      sendMail(EMAIL_CONTENT.CHANGE_PASSWORD, user);
      return res
        .status(200)
        .json({ message: 'Your password has been successfully updated' });
    });
  },

  /**
   *  user logout
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  userLogout(req, res) {
    // TODO: set authorizaion and x-access- token to null
    res.status(200).json({
      message: 'You have been Logged out',
    });
  },

  /**
   *  current-user
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  currentUser(req, res) {
    res.status(200).json(UserController.transformUser(req.user));
  },

  /**
   *  user edit User
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  editUser(req, res) {
    const { userId } = req.decoded;
    const { firstName, lastName, phoneNumber, phoneNumber2 } = req.body;
    User.findOne({
      where: { id: userId },
    })
      .then((user) => {
        const error = { ...UserValidation.isUserActive(user.isActive) };
        if (Object.keys(error).length) {
          return res.status(403).json(error);
        }
        if (!user) {
          return res.status(404).send({
            message: 'User not found',
          });
        }
        return user
          .update({ firstName, lastName, phoneNumber, phoneNumber2 })
          .then(() => res.status(200).json(UserController.transformUser(user)));
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  },

  /**
   *  skip intro text
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   * */
  skipIntroText(req, res) {
    const { userId } = req.decoded;
    User.findOne({
      where: { id: userId },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found',
          });
        }
        return user
          .update({ firstTimeLogin: false })
          .then(() => res.status(200).json(UserController.transformUser(user)));
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  },

  /**
   *  user edit entertainer
   * @function
   * @param {object} req is request object
   * @param {object} res is response object
   * @return {undefined} returns undefined
   **/
  editEntertainer(req, res) {
    const {
      phoneNumber,
      about,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel,
    } = req.body;

    const entertainerProfileData = {
      about,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel,
    };

    return Promise.all([
      req.user.update({ phoneNumber }),
      updateUser(req.user, entertainerProfileData, 'Profile'),
    ]).then((user) => {
      res.status(200).json({
        user: UserController.transformUser(user[0]),
        entertainerProfile: user[1],
      });
    });
  },

  /**
   * faq mailer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async faqMailer(req, res) {
    const { userEmail, userSubject, userMessage } = req.body;
    const errors = {
      ...validString(userSubject),
      ...validString(userMessage),
      ...UserValidation.emailValidation(userEmail),
    };

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ message: 'There are invalid fields in the form', errors });
    }

    try {
      await sendMail(
        EMAIL_CONTENT.FAQ,
        { email: 'info@duvlive.com' },
        { userSubject, userMessage, userEmail }
      );
      return res.status(200).json({
        message:
          'Your questions, complaints or suggestions has been successfully noted, the support team will get back to you',
      });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong', error });
    }
  },

  /**
   * contact us
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async contactUs(req, res) {
    const { fullName, userEmail, userSubject, userMessage, phone } = req.body;
    const errors = {
      ...validString(userSubject),
      ...validString(userMessage),
      ...validString(fullName),
      ...UserValidation.emailValidation(userEmail),
    };

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ message: 'There are invalid fields in the form', errors });
    }

    try {
      await sendMail(
        EMAIL_CONTENT.CONTACT_US,
        { email: 'info@duvlive.com' },
        { userEmail, userSubject, userMessage, phone, fullName }
      );
      return res.status(200).json({ message: 'Thanks for contacting us' });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong', error });
    }
  },

  upgradeUserToEntertainer(req, res) {
    const id = req.user.id;
    EntertainerProfile.findOne({
      where: { userId: id },
    })
      .then((entertainer) => {
        if (entertainer) {
          return res
            .status(401)
            .json({ message: 'Entertianer profile exists' });
        }
        [EntertainerProfile, BankDetail, Identification, ApprovalComment].map(
          async (model) => await model.create({ userId: id })
        );
        return res.status(200).json({
          message: 'Entertainer profile has been successfully generated',
        });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  },

  /**
   * invite Friend
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async inviteFriend(req, res) {
    const { email, recommendAs } = req.body;

    const errors = {
      ...UserValidation.emailValidation(email),
    };

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .json({ message: 'There are invalid fields in the form', errors });
    }

    try {
      const link = `${process.env.HOST}`;
      const contentBottom = `You have been recommended as a ${
        recommendAs || 'Friend'
      }. Live your best Life today and let your dreams come true.`;
      await sendMail(
        EMAIL_CONTENT.INVITE_FRIEND,
        { email },
        { link, contentBottom }
      );
      return res.status(200).json({ message: 'Invite sent successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong', error });
    }
  },
};

export default UserController;
