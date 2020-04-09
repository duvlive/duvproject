import { ReviewController } from '../controllers';
import Authentication from '../middleware/authentication';

const reviewRoutes = (router) => {
  router
    .route('/api/v1/review')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(ReviewController.updateUserReview)
    .put(ReviewController.updateUserReview)
    .get(ReviewController.getUserReviews);

  router.get('/api/v1/review/:id', ReviewController.getOneReview);
};

export default reviewRoutes;
