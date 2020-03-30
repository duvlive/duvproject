import { ApplicationController } from '../controllers';
import Authentication from '../middleware/authentication';

const applicationRoutes = router => {
  router.get(
    '/api/v1/entertainer/bids',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ApplicationController.getEntertainerBids
  );

  router
    .route('/api/v1/application')
    .all(
      Authentication.verifyToken,
      Authentication.validateEntertainer,
      Authentication.isActiveUser
    )
    .post(ApplicationController.entertainerApplication)
    .put(ApplicationController.entertainerApplication)
    .get(ApplicationController.getEntertainerApplications);

  router.post(
    '/api/v1/applications/approve/:applicationId',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    ApplicationController.approveAuctionsApplication
  );
};

export default applicationRoutes;
