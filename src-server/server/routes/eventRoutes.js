import { EventController } from '../controllers';
import Authentication from '../middleware/authentication';

const eventRoutes = (router) => {
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

  router.get(
    '/api/v1/events/entertainers',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    EventController.getEntertainerEvents
  );

  router.get('/api/v1/events/:id', EventController.getOneEvent);

  // Auctions
  router.get(
    '/api/v1/auctions',
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser,
    EventController.getUserAuctions
  );

  // Requests
  router.get(
    '/api/v1/user/requests',
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser,
    EventController.getUserRequests
  );

  router.get(
    '/api/v1/available-auctions',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    EventController.getAvailableAuctions
  );

  // Bids
  router.get(
    '/api/v1/auctions/bids/:id',
    Authentication.verifyToken,
    Authentication.validateUser,
    Authentication.isActiveUser,
    EventController.getEventBids
  );
};

export default eventRoutes;
