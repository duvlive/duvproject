import { BadgeController } from '../controllers';
import Authentication from '../middleware/authentication';

const badgeRoutes = router => {
  router
    .route('/api/v1/badge')
    .all(
      Authentication.verifyToken,
      Authentication.validateUser,
      Authentication.isActiveUser
    )
    .post(BadgeController.userBadge)
    .get(BadgeController.getUserBadges);
};

export default badgeRoutes;
