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
};

export default eventEntertainerRoutes;
