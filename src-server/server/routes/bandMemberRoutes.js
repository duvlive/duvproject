import { ApplicationController } from '../controllers';
import Authentication from '../middleware/authentication';

const bandMemberRoutes = (router) => {
  router.get(
    '/api/v1/applications/dashboard/bandMember',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.convertBandMemberToEntertainer,
    Authentication.validateEntertainer,
    ApplicationController.getDashboardDetailsForEntertainer
  );
};

export default bandMemberRoutes;
