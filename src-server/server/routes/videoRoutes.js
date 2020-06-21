import { VideoController } from '../controllers';
import Authentication from '../middleware/authentication';

const videoRoutes = (router) => {
  router.get('/api/v1/video/:userId', VideoController.getEntertainerVideo);
  router.post(
    '/api/v1/video/save',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateEntertainer,
    VideoController.saveVideo
  );
  router.delete('/api/v1/video/delete/:id', VideoController.deleteVideo);
  router.put(
    '/api/v1/video/:approve/:id',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    VideoController.approveVideo
  );
  router.get(
    '/api/v1/video-all',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    VideoController.getVideos
  );
};

export default videoRoutes;
