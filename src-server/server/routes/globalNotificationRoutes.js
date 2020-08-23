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
    .put(GlobalNotificationController.createAndUpdateGlobalNotification);

  router
    .route('/api/v1/global/notification')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .get(GlobalNotificationController.getGlobalNotifications);
};

export default globalNotificationsRoutes;
