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
  router.get(
    '/api/v1/cancel-evententertainer/:id',
    CancelEventEntertainerController.getOneCancelEventEntertainers
  );
  router.get(
    '/api/v1/cancel-evententertainer/resolve/entertainer/:id',
    CancelEventEntertainerController.resolveEntertainerRefund
  );
  router.get(
    '/api/v1/cancel-evententertainer/resolve/owner/:id',
    CancelEventEntertainerController.resolveUserRefund
  );
};

export default cancelevententertainerRoutes;
