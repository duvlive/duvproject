import {
  ApplicationController,
  EventController,
  PaymentController,
  BadgeController,
  GalleryController,
  VideoController,
  UserController,
} from '../controllers';
import Authentication from '../middleware/authentication';

const bandMemberRoutes = (router) => {
  router.get(
    '/api/v1/applications/dashboard/bandMember',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    ApplicationController.getDashboardDetailsForBandMember
  );

  router.get(
    '/api/v1/upcoming-events/bandMember',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    EventController.getEntertainerEvents
  );

  router.get(
    '/api/v1/payments/bandMember',
    Authentication.verifyToken,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    PaymentController.getPayments
  );

  // router.get(
  //   '/api/v1/payments/bandMember',
  //   Authentication.verifyToken,
  //   Authentication.convertBandMemberToEntertainer,
  //   Authentication.validateEntertainer,
  //   BadgeController.getBadges
  // );

  router.get(
    '/api/v1/badges/bandMember',
    Authentication.verifyToken,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    BadgeController.getUserBadges
  );

  router.get(
    '/api/v1/gallery/bandMember',
    Authentication.verifyToken,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    GalleryController.getEntertainerGallery
  );

  router.get(
    '/api/v1/videos/bandMember',
    Authentication.verifyToken,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    VideoController.getEntertainerVideo
  );

  router.get(
    '/api/v1/bandMembers/team',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    UserController.getBandMembers
  );
};

export default bandMemberRoutes;
