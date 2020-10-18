import { updateUser } from '../utils';
import { User, ApprovalComment, Notification, BadgeUser } from '../models';
import { NOTIFICATIONS, NOTIFICATION_TYPE } from '../constant';

const ApproveCommentController = {
  /**
   * create ApprovalComment
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveEntertainerWithComment(req, res) {
    const YES = 'YES';
    const {
      entertainerProfile,
      bankAccount,
      contact,
      identification,
      youTube,
      userId,
    } = req.body;

    return User.findOne({ where: { id: userId } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      ApprovalComment.findOne({
        where: { userId },
      })
        .then((foundApprovalComment) => {
          if (!foundApprovalComment) {
            return res
              .status(404)
              .json({ message: 'Approval Comment does not exist' });
          }

          const approvalComments = {
            entertainerProfile:
              entertainerProfile || foundApprovalComment.entertainerProfile,
            bankAccount: bankAccount || foundApprovalComment.bankAccount,
            contact: contact || foundApprovalComment.contact,
            identification:
              identification || foundApprovalComment.identification,
            youTube: youTube || foundApprovalComment.youTube,
          };

          let approved = false;
          let message = 'Approval Comment has been successfully updated';
          if (
            approvalComments.entertainerProfile === YES &&
            approvalComments.bankAccount === YES &&
            approvalComments.contact === YES &&
            approvalComments.identification === YES &&
            approvalComments.youTube === YES
          ) {
            approved = true;
            message = 'User has been approved';
          }

          Promise.all([
            updateUser(user, approvalComments, 'ApprovalComment'),
            updateUser(
              user,
              {
                approved,
              },
              'Profile'
            ),
          ])
            .then(async ([newApprovalComment, profile]) => {
              if (approved) {
                const badgeExists = await BadgeUser.findOne({
                  where: {
                    userId,
                    badgeId: 1,
                  },
                });

                if (!badgeExists) {
                  await BadgeUser.create({
                    badgeId: 1,
                    userId: userId,
                  });
                  await Notification.create({
                    userId: userId,
                    title: NOTIFICATIONS.NEW_AWARD,
                    description: `You have been awarded the DUV CERTIFIED Award`,
                    type: NOTIFICATION_TYPE.SUCCESS,
                    actionId: 1,
                  });
                }
              }
              return res.status(200).json({
                message,
                approvalComments: newApprovalComment,
                profile,
              });
            })
            .catch((error) => {
              const status = error.status || 500;
              const errorMessage = error.message || error;
              return res.status(status).json({ message: errorMessage });
            });
        })
        .catch((error) => {
          const errorMessage = error.message || error;
          return res.status(412).json({ message: errorMessage });
        });
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
    User.findOne({ where: { id: userId } })
      .then((user) =>
        Promise.all([user.getApprovalComment(), user.getProfile()])
      )
      .then(([comments, profile]) =>
        res.status(200).json({ comments, profile })
      )
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },
};

export default ApproveCommentController;
