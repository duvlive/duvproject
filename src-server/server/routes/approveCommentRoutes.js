import { ApproveCommentController } from '../controllers';
import Authentication from '../middleware/authentication';

const approveCommentRoutes = router => {
  // Admin routes
  router
    .route('/api/v1/approveEntertainer')
    .all(Authentication.verifyToken, Authentication.validateAdmin)
    .put(ApproveCommentController.approveEntertainerWithComment)
    .get(ApproveCommentController.getEntertainerApprovalWithComment);
};

export default approveCommentRoutes;
