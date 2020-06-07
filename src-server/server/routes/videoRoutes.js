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
  router.put('/api/v1/video/:approve/:id', VideoController.approveVideo); //TODO: add administrator middleware
  router.delete('/api/v1/video/delete/:id', VideoController.deleteVideo);
  router.get(
    '/api/v1/video',
    Authentication.verifyToken,
    Authentication.isActiveUser,
    Authentication.validateAdmin,
    VideoController.getVideos
  );
};

export default videoRoutes;
