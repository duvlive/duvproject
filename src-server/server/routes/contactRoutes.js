import { ContactController } from '../controllers';
import Authentication from '../middleware/authentication';

const contactRoutes = router => {
  router
    .route('/api/v1/contact')
    .all(
      Authentication.verifyToken,
      Authentication.validateEntertainer,
      Authentication.isActiveUser
    )
    .post(ContactController.updateUserContact)
    .put(ContactController.updateUserContact)
    .get(ContactController.getUserContacts);
};

export default contactRoutes;
