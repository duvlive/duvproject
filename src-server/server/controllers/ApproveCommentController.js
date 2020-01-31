import { validString, updateUser } from '../utils';

const ApproveCommentController = {
  /**
   * create ApprovalComment
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveEntertainerWithComment(req, res) {
    const { entertainerProfile, bankAccount, contact, identification, youTube, approve, userId } = req.body;

    const error = {
      ...validString(entertainerProfile),
      ...validString(bankAccount),
      ...validString(contact),
      ...validString(identification),
      ...validString(youTube)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    return updateUser(
      req.user,
      {
        entertainerProfile, 
				bankAccount, 
				contact, 
				identification, 
				youTube,
				approve,
        userId
      },
      'ApprovalComment'
    )
      .then(newApprovalComment => {
        return res.status(200).json({
          message: 'Approval Comment added successfully',
          approvalComment: newApprovalComment
        });
      })
      .catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get ApprovalComment
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserApprovalComment(req, res) {
    req.user.getApprovalComment().then(approvalComment => {
      if (!approvalComment || approvalComment.length === 0) {
        return res.status(404).json({ message: 'Approval Comment not found' });
      }
      return res.status(200).json({ approvalComment });
    });
  }
};

export default ApproveCommentController;
