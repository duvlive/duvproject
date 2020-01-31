import { validString, updateUser } from '../utils';
import { User } from '../models';

const ApproveCommentController = {
  /**
   * create ApprovalComment
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveEntertainerWithComment(req, res) {
    const { entertainerProfile, bankAccount, contact, identification, youTube, approved, userId } = req.body;

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
    return User
		.findOne({where: { id: userId }})
		.then(user => Promise.all([updateUser(
      user,
      {
        entertainerProfile: 1, 
				bankAccount, 
				contact, 
				identification, 
				youTube,
				approved,
      },
      'ApprovalComment'
    ), updateUser(
      user,
      {
				approved,
      },
      'Profile'
    )]))
		.then(([newApprovalComment, profile]) => {
        return res.status(200).json({
          message: 'Approval comment added successfully',
          approvalComment: newApprovalComment,
					profile,
        });
    })
		.catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get ApprovalCommentWithComment
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerApprovalWithComment(req, res) {
		const { userId } = req.body;
		User.findOne({where: { id: userId }})
		.then(user =>
			Promise.all([user.getApprovalComment(), user.getProfile()]))
		.then(([comments, profile]) => res.status(200).json({ comments, profile }))
		.catch(error => {
			const status = error.status || 500;
			const errorMessage = error.message || error;
			return res.status(status).json({ message: errorMessage });
		});
  }
};

export default ApproveCommentController;
