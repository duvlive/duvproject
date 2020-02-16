import { Router } from 'express';
import {
  UserController,
  EntertainerProfileController,
  BankDetailController,
  ContactController,
  IdentificationController,
  EventController,
  ApproveCommentController,
  EmailController,
  ImageController,
  EventEntertainerController,
  AuctionController,
  GalleryController,
  VideoController
} from './controllers';
import Authentication from './middleware/authentication';
import passport from 'passport';
const router = Router();

// Email Template route
router.get('/email-template', EmailController.getEmailTemplate);

// Welcome route
router.get('/api/v1', (_, res) =>
  res.json({ success: 'Welcome to DUV Live API V1. Live your Best Live' })
);

// image upload
router.post(
  '/api/v1/upload-profile-image',
  Authentication.verifyToken,
  Authentication.isActiveUser,
  ImageController.uploadImage,
  ImageController.saveImage
);

// user routes.
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
  .all(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    Authentication.isActiveUser
  )
  .put(BankDetailController.updateUserBankDetail)
  .get(BankDetailController.getUserBankDetail);

// Contact routes
router
  .route('/api/v1/contact')
  .all(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    Authentication.isActiveUser
  )
  .post(ContactController.updateUserContact)
  .put(ContactController.updateUserContact)
  .get(ContactController.getUserContacts);

// Identification routes
router
  .route('/api/v1/identification')
  .all(
    Authentication.verifyToken,
    Authentication.validateEntertainer,
    Authentication.isActiveUser
  )
  .put(IdentificationController.updateEntertainerIdentification)
  .get(IdentificationController.getIdentification);

// Admin routes
router
  .route('/api/v1/approveEntertainer')
  .all(Authentication.verifyToken, Authentication.validateAdmin)
  .put(ApproveCommentController.approveEntertainerWithComment)
  .get(ApproveCommentController.getEntertainerApprovalWithComment);

// Events routes
router
  .route('/api/v1/events')
  .all(
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser
  )
  .post(EventController.updateUserEvent)
  .put(EventController.updateUserEvent)
  .get(EventController.getUserEvent);

// gallery routes
router.get('/api/v1/gallery/:userId', GalleryController.getEntertainerGallery);
router.post(
  '/api/v1/gallery/save',
  Authentication.verifyToken,
  Authentication.isActiveUser,
  Authentication.validateEntertainer,
  GalleryController.uploadImage,
  GalleryController.saveImage
);
router.put(
  '/api/v1/gallery/set-as-profile',
  Authentication.verifyToken,
  GalleryController.setAsProfileImage
);
router.put('/api/v1/gallery/:approve/:id', GalleryController.approveImage); //TODO: add administrator middleware
router.delete('/api/v1/gallery/delete/:id', GalleryController.deleteImage);

// video routes
router.get('/api/v1/video/:userId', VideoController.getEntertainerVideo);
router.post(
  '/api/v1/video/save',
  Authentication.verifyToken,
  Authentication.isActiveUser,
  Authentication.validateEntertainer,
  VideoController.saveVideo
);
router.put('/api/v1/video/:approve/:id', VideoController.approveVideo); //TODO: add administrator middleware
router.delete('/api/v1/video/delete/:id', VideoController.deleteVideo);

// Events routes
router
  .route('/api/v1/eventEntertainer')
  .all(
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser
  )
  .post(EventEntertainerController.updateEventEntertainer)
  .put(EventEntertainerController.updateEventEntertainer)
  .get(EventEntertainerController.getEventEntertainers);

// Auction routes
router
  .route('/api/v1/auction')
  .all(
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser
  )
  .post(AuctionController.updateEventAuction)
  .put(AuctionController.updateEventAuction)
  .get(AuctionController.getEventAuctions);

export default router;
