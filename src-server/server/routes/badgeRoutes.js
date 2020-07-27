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
    BadgeController.getUserBadges
  );

  router.get(
    '/api/v1/badges-all',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    BadgeController.getAllBadges
  );

  router.get(
    '/api/v1/badges-list',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    BadgeController.getAllBadgesList
  );

  router.get(
    '/api/v1/admin/badge',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    BadgeController.getOneBadge
  );

  router.get(
    '/api/v1/badge-users',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    BadgeController.getAllBadgeUsers
  );
};

export default badgeRoutes;
