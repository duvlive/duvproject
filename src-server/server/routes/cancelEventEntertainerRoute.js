import { CancelEventEntertainerController } from '../controllers';

const cancelevententertainerRoutes = (router) => {
  router.get(
    '/api/v1/cancel-evententertainer',
    CancelEventEntertainerController.getCancelEventEntertainers
  );
};

export default cancelevententertainerRoutes;
