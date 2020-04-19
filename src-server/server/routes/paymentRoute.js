import { PaymentController } from '../controllers';
import Authentication from '../middleware/authentication';

const paymentRoutes = (router) => {
  router.post(
    '/api/v1/pay',
    Authentication.verifyToken,
    PaymentController.initializeTransaction
  );

  router.post('/api/v1/paystack/webhook', PaymentController.paystactEventHook);

  router.get(
    '/api/v1/paystack/verify/:reference',
    PaymentController.verifyTransaction
  );

  router
    .route('/api/v1/payments')
    .all(Authentication.verifyToken, Authentication.validateAdmin)
    .get(PaymentController.getSuccessTransactions);

  router
    .route('/api/v1/myPayments')
    .all(Authentication.verifyToken, Authentication.validateUser)
    .get(PaymentController.getSuccessTransactionsByUserId);

  router
    .route('/api/v1/currentCustomer')
    .all(Authentication.verifyToken, Authentication.validateUser)
    .get(PaymentController.getPaystackCustomer);

  router.get(
    '/api/v1/user/payments',
    Authentication.verifyToken,
    Authentication.validateUser,
    PaymentController.getAllUserPayments
  );
};

export default paymentRoutes;
