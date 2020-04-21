import { ApplicationController } from '../controllers';
import Authentication from '../middleware/authentication';

const applicationRoutes = (router) => {
  router.get(
    '/api/v1/applications/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ApplicationController.getOneApplication
  );

  router.get(
    '/api/v1/entertainer/bids',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ApplicationController.getEntertainerBids
  );

  router.get(
    '/api/v1/entertainer/requests',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    ApplicationController.getEntertainerRequest
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

  router.post(
    '/api/v1/applications/process-request/:applicationId',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    ApplicationController.processRequestApplication
  );

  router.get(
    '/api/v1/applications/dashboard/user',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    ApplicationController.getApplicationsForUserDashboard
  );
};

export default applicationRoutes;
