import { CommissionController } from '../controllers';
import Authentication from '../middleware/authentication';

const commissionRoutes = (router) => {
  router
    .route('/api/v1/commissions')
    .all(Authentication.verifyToken, Authentication.validateAdmin)
    .get(CommissionController.getCommission)
    .post(CommissionController.updateCommission)
    .put(CommissionController.updateCommission);

  router.put(
    '/api/v1/commission/set-as-default',
    CommissionController.setAsDefaultCommission
  );

  router.get(
    '/api/v1/currentCommission',
    CommissionController.getDefaultCommission
  );

  router.get(
    '/api/v1/commissions-all',
    Authentication.verifyToken,
    Authentication.validateAdmin,
    CommissionController.getCommission
  );
};

export default commissionRoutes;
