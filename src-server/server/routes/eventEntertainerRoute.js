import { EventEntertainerController } from '../controllers';
import Authentication from '../middleware/authentication';

const eventEntertainerRoutes = (router) => {
  router
    .route('/api/v1/eventEntertainer')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(EventEntertainerController.updateEventEntertainer)
    .put(EventEntertainerController.updateEventEntertainer)
    .get(EventEntertainerController.getEventEntertainers);

  router.get(
    '/api/v1/eventEntertainer/:id',
    EventEntertainerController.getOneEventEntertainer
  );

  router.post(
    '/api/v1/evententertainer/not-available/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    EventEntertainerController.entertainerNotAvailable
  );

  router.post(
    '/api/v1/evententertainer/remove/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    EventEntertainerController.userRemoveEntertainer
  );
};

export default eventEntertainerRoutes;
