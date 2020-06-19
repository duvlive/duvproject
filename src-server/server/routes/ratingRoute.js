import { RatingController } from '../controllers';
import Authentication from '../middleware/authentication';

const ratingRoutes = (router) => {
  router
    .route('/api/v1/rating')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(RatingController.updateUserRating)
    .put(RatingController.updateUserRating)
    .get(RatingController.getUserRatings);

  router
    .route('/api/v1/rating/:id')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .get(RatingController.getOneRating);

  router
    .route('/api/v1/average-rating')
    .all(
      Authentication.verifyToken,
      Authentication.isActiveUser,
      Authentication.validateEntertainer
    )
    .get(RatingController.getAverageEntertainerRatings);

  router.get(
    '/api/v1/entertainer-ratings',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    RatingController.getEntertainerRatings
  );

  router.get(
    '/api/v1/entertainer-rating/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    RatingController.getOneEntertainerRating
  );

  router.get(
    '/api/v1/ratings',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    RatingController.getRatings
  );
};

export default ratingRoutes;
