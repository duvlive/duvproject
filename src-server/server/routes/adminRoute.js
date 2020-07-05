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
};

export default adminRoutes;
