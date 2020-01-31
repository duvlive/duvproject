import { Router } from 'express';
import {
  UserController,
  EntertainerProfileController,
  BankDetailController,
  ContactController,
  IdentificationController,
  EventController,
	ApproveCommentController,
} from './controllers';
import Authentication from './middleware/authentication';
import passport from 'passport';
import { generateEmailTemplate } from './MailSender';
import EMAIL_CONTENT from './email-template/content';

const router = Router();

// welcome route
router.get('/api/v1', (_, res) =>
  res
    .status(200)
    .json({ success: 'Welcome to DUV Live API V1. Live your Best Live' })
);

// TODO: create controller for this
// email route
router.get('/email-template', (req, res) => {
  const email = req.query.email || 'NOT_FOUND';
  if (!EMAIL_CONTENT[email]) {
    return res.json({ message: 'Email Template not found' });
  }
  const emailType = req.query.type === 'text' ? 'text' : 'html';
  const options = {
    ...EMAIL_CONTENT[email],
    link:
      'http://duvlive.herokuapp.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsInR5cGUiOjIsImlhdCI6MTU3OTQzMDYzMH0.Wc-0c9uGNgf2fIKDR_58ZFHHtEftWB1Tso8ym5YTSQY',
    firstName: '[FirstName]'
  };
  generateEmailTemplate(options).then(data => {
    return res.send(data[emailType]);
  });
});

// user routes.
router.post('/api/v1/users', UserController.createUser);
router.post('/api/v1/users/login', UserController.userLogin);
router.get('/api/v1/users/logout', UserController.userLogout);
router.get('/api/v1/users/activate', UserController.activateUser);
router.post('/api/v1/users/password-reset', UserController.passwordReset);
router.post('/api/v1/users/update-password', UserController.updatePassword);

router.get(
  '/api/v1/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/api/v1/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  UserController.socialLogin
);

router.get(
  '/api/v1/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);
router.get(
  '/api/v1/auth/google/callback',
  passport.authenticate('google', { session: false }),
  UserController.socialLogin
);

router
  .route('/api/v1/users/editUser')
  .put(
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser,
    UserController.editUser
  );
router
  .route('/api/v1/users/editEntertainer')
  .put(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    Authentication.isActiveUser,
    UserController.editEntertainer
  );
router
  .route('/api/v1/users/updateEntertainerProfile')
  .put(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    Authentication.isActiveUser,
    EntertainerProfileController.updateUserAndEntertainerProfile
  );

// bankDetails routes
router
  .route('/api/v1/bankDetail')
  .all(Authentication.verifyToken, Authentication.validateEntertainer, Authentication.isActiveUser)
  .put(BankDetailController.updateUserBankDetail)
  .get(BankDetailController.getUserBankDetail);

// Contact routes
router
  .route('/api/v1/contact')
  .all(Authentication.verifyToken, Authentication.validateEntertainer, Authentication.isActiveUser)
  .post(ContactController.updateUserContact)
  .put(ContactController.updateUserContact)
  .get(ContactController.getUserContacts);

// Identification routes
router
  .route('/api/v1/identification')
  .all(Authentication.verifyToken, Authentication.validateEntertainer, Authentication.isActiveUser)
  .put(IdentificationController.updateEntertainerIdentification)
  .get(IdentificationController.getIdentification);

// Admin routes
router
  .route('/api/v1/approveEntertainer')
  .all(Authentication.verifyToken, Authentication.validateAdmin)
  .put(ApproveCommentController.approveEntertainerWithComment);

// Events routes
router
  .route('/api/v1/events')
  .all(Authentication.verifyToken, Authentication.validateUser, Authentication.isActiveUser)
  .post(EventController.updateUserEvent)
  .put(EventController.updateUserEvent)
  .get(EventController.getUserEvent);

export default router;
