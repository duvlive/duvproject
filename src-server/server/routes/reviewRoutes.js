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

  router.get(
    '/api/v1/entertainer-reviews',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ReviewController.getEntertainerReviews
  );

  router.get(
    '/api/v1/entertainer-review/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ReviewController.getOneEntertainerReview
  );

  router.get(
    '/api/v1/reviews',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    ReviewController.getReviews
  );
};

export default reviewRoutes;
