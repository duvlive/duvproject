// link: '#', and firstName will be added via options
const EMAIL_CONTENT = {
  // After Registration
  ACTIVATE_YOUR_ACCOUNT: {
    subject: 'Please Confirm Your Email',
    title: 'Please Confirm Your Email',
    contentTop:
      'Thanks for signing up to DUV LIVE. To complete your account set up, please confirm your email address by clicking the button below',
    buttonText: 'Verify Email',
    copyright: `You are receiving this email because you signed up to DUV LIVE, the No 1 Promoter of Premium Live Entertainment. If you did not make this request, please contact DUV LIVE support.
    Please do not reply to this email. Emails sent to this address will not be answered.`,
  },
  PASSWORD_RESET: {
    subject: 'Password Reset',
    title: 'Password Reset',
    contentTop:
      'We received a request to reset your DUV LIVE password. Click the link below to choose a new one:',
    contentFooter: `If you do not want to reset your password, then kindly ignore this message and your password will remain unchanged.<br />
    <br />
    If you didn't make this request, or need assistance, kindly contact us at DUV LIVE Support.`,
    buttonText: 'Reset Password',
    copyright:
      'Please do not reply to this email. Emails sent to this address will not be answered.',
  },
  CHANGE_PASSWORD: {
    subject: 'Your password has been changed!',
    title: 'Password Changed!',
    contentTop: 'Your password has been successfully changed.',
    contentBottom:
      'If this change was not done by you, then your DUV LIVE account might have been compromised. We strongly advise that you reset your password as soon as possible.',
    contentFooter:
      'If you are in need of technical assistance, kindly contact DUV LIVE Support.',
  },
  FAQ: {
    subject: 'FAQ',
    title: 'FAQ',
  },
  CONTACT_US: {
    subject: 'CONTACT US',
    title: 'CONTACT US',
  },
  INVITE_FRIEND: {
    subject: 'INVITE FRIEND',
    title: 'INVITE FRIEND',
    contentTop:
      'You have been invited to join the D.U.V LIVE online platform that supports and promotes the best in live entertainment. Join now!',
    buttonText: 'JOIN NOW',
  },
  APPROVED_BID: {
    title: 'Your Bids has been approved',
    subject: 'Your Bid has been approved',
    buttonText: 'Decline',
  },
  PAID_REQUEST: {
    title: 'Congratulations!!! Your Performance Has Been Fully Paid For',
    subject: 'Congratulations!!! Your Performance Has Been Fully Paid For',
    buttonText: 'Check it out!',
  },
  ENTERTAINER_REQUEST: {
    subject: 'YIPPEE!!! You have a new event request',
    buttonText: 'Accept Request',
  },
  USER_CANCELLED_EVENT: {
    subject: 'Cancelled Event',
  },
};

export default EMAIL_CONTENT;

// Check your inbox for the email address associated with your Pinterest account.
// Look for a message with the subject line "Please confirm your email"
// Open the email and click Confirm your email.
