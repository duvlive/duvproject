import { CommissionController } from '../controllers';
import Authentication from '../middleware/authentication';

const commissionRoutes = router => {
  router
    .route('/api/v1/commissions')
    .all(Authentication.verifyToken, Authentication.validateAdmin)
    .post(CommissionController.updateCommission)
    .put(CommissionController.updateCommission);

  router.get(
    '/api/v1/currentCommission',
    CommissionController.getDefaultCommission
  );
};

export default commissionRoutes;
