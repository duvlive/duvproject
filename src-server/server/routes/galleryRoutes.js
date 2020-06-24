import { GalleryController } from '../controllers';
import Authentication from '../middleware/authentication';

const galleryRoutes = (router) => {
  router.get(
    '/api/v1/gallery',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    GalleryController.getEntertainerGallery
  );

  router.post(
    '/api/v1/gallery/save',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    GalleryController.uploadImage,
    GalleryController.saveImage
  );

  router.put(
    '/api/v1/gallery/set-as-profile',
    Authentication.verifyToken,
    GalleryController.setAsProfileImage
  );

  router.delete('/api/v1/gallery/delete/:id', GalleryController.deleteImage);

  router.put(
    '/api/v1/gallery/:approve/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    GalleryController.approveImage
  );

  router.get(
    '/api/v1/gallery-all',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    GalleryController.getGallery
  );
};

export default galleryRoutes;
