import { UserController, NotificationController } from '../controllers';
import Authentication from '../middleware/authentication';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import FacebookStrategy from 'passport-facebook';

const userRoutes = (router) => {
  router.post('/api/v1/users', UserController.createUser);
  router.post('/api/v1/users/login', UserController.userLogin);
  router.get('/api/v1/users/logout', UserController.userLogout);
  router.get('/api/v1/users/activate', UserController.activateUser);

  router.post('/api/v1/users/forgot-password', UserController.forgotPassword);
  router.post('/api/v1/users/reset-password', UserController.resetPassword);
  router.put(
    '/api/v1/users/change-password',
    Authentication.verifyToken,
    UserController.changePassword
  );
  router.put(
    '/api/v1/users/complete-registration',
    Authentication.verifyToken,
    UserController.completeRegistration
  );

  router.put(
    '/api/v1/users/skip-first-time-text',
    Authentication.verifyToken,
    UserController.skipIntroText
  );

  router.get(
    '/api/v1/who-am-i',
    Authentication.verifyToken,
    UserController.currentUser
  );

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
    '/api/v1/notifications',
    Authentication.verifyToken,
    NotificationController.getNotifications
  );

  router.get('/api/v1/auth/test', UserController.socialLogin);

  router.get(
    '/api/v1/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
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

  const googleStrategy = GoogleStrategy.OAuth2Strategy;
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.GOOGLE_CALLBACK}`,
        profileFields: ['emails', 'name'],
      },
      function (accessToken, refreshToken, profile, done) {
        const {
          email,
          family_name: lastName,
          given_name: firstName,
          picture: picture,
        } = profile._json;
        done(null, { firstName, lastName, email, picture });
      }
    )
  );

  const facebookStrategy = FacebookStrategy.Strategy;

  passport.authenticate('facebook');
  passport.use(
    new facebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.FACEBOOK_CALLBACK}`,
        profileFields: ['emails', 'name', 'picture.type(large)'],
      },
      function (accessToken, refreshToken, profile, done) {
        const {
          last_name: lastName,
          first_name: firstName,
          email,
          picture: {
            data: { url },
          },
        } = profile._json;
        done(null, {
          firstName,
          lastName,
          email,
          picture: url,
        });
      }
    )
  );
};

export default userRoutes;
