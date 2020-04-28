import { BadgeController } from '../controllers';
import Authentication from '../middleware/authentication';

const badgeRoutes = (router) => {
  router
    .route('/api/v1/badge')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(BadgeController.createNewBadge)
    .get(BadgeController.getUserBadges);
};

export default badgeRoutes;
