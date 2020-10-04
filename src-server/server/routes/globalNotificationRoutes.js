import { GlobalNotificationController } from '../controllers';
import Authentication from '../middleware/authentication';

const globalNotificationsRoutes = (router) => {
  router
    .route('/api/v1/admin/global/notification')
    .all(
      Authentication.verifyToken,
      Authentication.isActiveUser,
      Authentication.validateAdmin
    )
    .post(GlobalNotificationController.createAndUpdateGlobalNotification)
    .put(GlobalNotificationController.createAndUpdateGlobalNotification)
    .get(GlobalNotificationController.getGlobalNotifications);

  router.get(
    '/api/v1/global/notifications',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    GlobalNotificationController.getUserGlobalNotification
  );
};

export default globalNotificationsRoutes;
