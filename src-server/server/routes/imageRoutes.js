import { ImageController } from '../controllers';
import Authentication from '../middleware/authentication';

const imageRoutes = (router) => {
  router.post(
    '/api/v1/upload-profile-image',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    ImageController.uploadImage,
    ImageController.saveImage
  );

  router.post(
    '/api/v1/upload-article-image',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    ImageController.uploadArticleImage,
    ImageController.getUploadedImage
  );
};

export default imageRoutes;
