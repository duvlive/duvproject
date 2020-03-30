import { IdentificationController } from '../controllers';
import Authentication from '../middleware/authentication';

const identificationRoutes = router => {
  router
    .route('/api/v1/identification')
    .all(
      Authentication.verifyToken,
      Authentication.validateEntertainer,
      Authentication.isActiveUser
    )
    .put(IdentificationController.updateEntertainerIdentification)
    .get(IdentificationController.getIdentification);
};

export default identificationRoutes;
