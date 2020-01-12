import { Router } from 'express';
import {
  UserController,
  UserProfileController,
  BankDetailController
} from './controllers';
import Authentication from './middleware/authentication';
import passport from 'passport';

const router = Router();

// welcome route
router.get('/api/v1', (_, res) =>
  res
    .status(200)
    .json({ success: 'Welcome to DUV Live API V1. Live your Best Live' })
);

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
    UserController.editUser
  );
router
  .route('/api/v1/users/editEntertainer')
  .put(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    UserController.editEntertainer
  );
router
  .route('/api/v1/users/updateUserProfile')
  .put(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    UserProfileController.updateUserAndUserProfile
  );

// bankDetails routes
router
  .route('/api/v1/bankDetail')
  .post(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    BankDetailController.createBankDetail
  )
  .put(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    BankDetailController.updateUserBankDetail
  )
  .get(Authentication.verifyToken,
    Authentication.validateEntertainer,
    BankDetailController.getUserBankDetail
    );

export default router;
