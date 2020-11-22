import { CancelEventEntertainerController } from '../controllers';

const cancelevententertainerRoutes = (router) => {
  router.get(
    '/api/v1/cancel-evententertainer',
    CancelEventEntertainerController.getCancelEventEntertainers
  );
  router.get(
    '/api/v1/cancel-evententertainer/:id',
    CancelEventEntertainerController.getOneCancelEventEntertainers
  );
};

export default cancelevententertainerRoutes;
