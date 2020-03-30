import { BankDetailController } from '../controllers';
import Authentication from '../middleware/authentication';

const bankDetailsRoutes = router => {
  router
    .route('/api/v1/bankDetail')
    .all(
      Authentication.verifyToken,
      Authentication.validateEntertainer,
      Authentication.isActiveUser
    )
    .put(BankDetailController.updateUserBankDetail)
    .get(BankDetailController.getUserBankDetail);
};

export default bankDetailsRoutes;
