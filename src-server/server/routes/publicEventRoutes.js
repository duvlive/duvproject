import { PublicEventController } from '../controllers';
import Authentication from '../middleware/authentication';

const publicEventRoutes = (router) => {
  router
    .route('/api/v1/public-events')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(PublicEventController.updateUserEvent)
    .put(PublicEventController.updateUserEvent)
    .get(PublicEventController.getUserPublicEvents);

  router.put(
    '/api/v1/public-events/:approve/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    PublicEventController.updateStatus
  );

  router.get(
    '/api/v1/public-events-all',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    PublicEventController.getPublicEventsForAdmin
  );

  router.get(
    '/api/v1/public-events/others',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    PublicEventController.getOtherUsersPublicEvents
  );

  router.get(
    '/api/v1/public-event/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    PublicEventController.getPublicEventByID
  );

  router.get(
    '/api/v1/admin/public-event/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    PublicEventController.getPublicEventByID
  );

  // public apis
  router.get(
    '/api/v1/frontend/public-events',
    PublicEventController.getPublicEventsForFrontend
  );
  router.get(
    '/api/v1/public-events/:slug',
    PublicEventController.getPublicEventBySlug
  );
};

export default publicEventRoutes;
