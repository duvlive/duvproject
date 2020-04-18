import { RatingController } from '../controllers';
import Authentication from '../middleware/authentication';

const ratingRoutes = (router) => {
  router
    .route('/api/v1/rating')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .post(RatingController.updateUserRating)
    .put(RatingController.updateUserRating)
    .get(RatingController.getUserRatings);

  router.get('/api/v1/rating/:id', RatingController.getOneRating);

  router
    .route('/api/v1/average-rating')
    .all(Authentication.verifyToken, Authentication.isActiveUser)
    .get(RatingController.getAverageEntertainerRatings);
};

export default ratingRoutes;
