import { UserController } from '../controllers';
import Authentication from '../middleware/authentication';

const otherRoutes = router => {
  router.post(
    '/api/v1/inviteFriend',
    Authentication.verifyToken,
    UserController.inviteFriend
  );
  router.post('/api/v1/contactUs', UserController.contactUs);

  router.post('/api/v1/faq', UserController.faqMailer);
};

export default otherRoutes;
