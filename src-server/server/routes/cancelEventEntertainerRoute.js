import { CancelEventEntertainerController } from '../controllers';
import Authentication from '../middleware/authentication';

const cancelevententertainerRoutes = (router) => {
  router.get(
    '/api/v1/cancel-evententertainer',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    CancelEventEntertainerController.getCancelEventEntertainers
  );
  router.get(
    '/api/v1/cancel-evententertainer/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    CancelEventEntertainerController.getOneCancelEventEntertainers
  );
  router.get(
    '/api/v1/cancel-evententertainer/resolve/entertainer/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    CancelEventEntertainerController.resolveEntertainerRefund
  );
  router.get(
    '/api/v1/cancel-evententertainer/resolve/owner/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    CancelEventEntertainerController.resolveUserRefund
  );
};

export default cancelevententertainerRoutes;
