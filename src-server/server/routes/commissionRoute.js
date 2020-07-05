import { CommissionController } from '../controllers';
import Authentication from '../middleware/authentication';

const commissionRoutes = (router) => {
  router
    .route('/api/v1/commissions')
    .all(Authentication.verifyToken, Authentication.validateAdmin)
    .post(CommissionController.updateCommission)
    .put(CommissionController.updateCommission)
    .get(CommissionController.getAllCommissions);

  router.get(
    '/api/v1/currentCommission',
    CommissionController.getDefaultCommission
  );

  router.delete(
    '/api/v1/commissions/delete/:id',
    Authentication.verifyToken,
    Authentication.validateAdmin,
    CommissionController.deleteOneCommission
  );
};

export default commissionRoutes;
