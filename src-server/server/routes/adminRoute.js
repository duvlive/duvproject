import { AdminController } from '../controllers';
import Authentication from '../middleware/authentication';

const adminRoutes = (router) => {
  router.get(
    '/api/v1/admin/users',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getAllUsers
  );

  router.get(
    '/api/v1/admin/user',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getOneUser
  );

  router.get(
    '/api/v1/admin/entertainer/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getOneEntertainer
  );

  router.get(
    '/api/v1/admin/event/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getOneEvent
  );

  router.get(
    '/api/v1/applications/dashboard/admin',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getDashboardDetailsForAdmin
  );

  router.get(
    '/api/v1/admin/pending-payments',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getPendingPayments
  );

  router.get(
    '/api/v1/admin/applications/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    AdminController.getOneApplication
  );
};

export default adminRoutes;
