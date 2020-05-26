import { BadgeController } from '../controllers';
import Authentication from '../middleware/authentication';

const badgeRoutes = (router) => {
  router
    .route('/api/v1/badge')
    .all(
      Authentication.verifyToken,
      Authentication.isActiveUser,
      Authentication.validateAdmin
    )
    .post(BadgeController.createNewBadge);

  router.post(
    '/api/v1/badge/assign',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    BadgeController.assignBadgeToUser
  );

  router.post(
    '/api/v1/badges/bandMembers',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    BadgeController.getBadges
  );
};

export default badgeRoutes;
