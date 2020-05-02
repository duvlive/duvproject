// link: '#', and firstName will be added via options
const EMAIL_CONTENT = {
  // After Registration
  ACTIVATE_YOUR_ACCOUNT: {
    subject: 'Verify your Email',
    title: 'Verify Your Email',
    contentTop:
      'You have successfully created your D.U.V Live account. To complete your registration, you need to confirm that we got your email address right.',
    buttonText: 'Verify Email',
  },
  PASSWORD_RESET: {
    subject: 'Password Reset',
    title: 'Password Reset',
    contentTop:
      "You (or someone pretending to be you) requested a password reset for your account. If you didn't made this request you can ignore this email.",
    contentBottom:
      "If you didn't request a password reset, let us know as soon as possible",
    buttonText: 'Reset Password',
  },
  CHANGE_PASSWORD: {
    subject: 'Your password has been changed!',
    title: 'Password Changed!',
    contentTop: 'This email confirms that your password has been changed.',
    contentBottom:
      "If you didn't change your password, your account might have been compromised and we recommend that you reset your password as soon as possible.",
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
    subject: 'YIPPEE!!! Your Bid has been approved',
    buttonText: 'Check it out!',
  },
  ENTERTAINER_REQUEST: {
    subject: 'YIPPEE!!! You have a new event request',
    buttonText: 'Accept Request',
  },
};

export default EMAIL_CONTENT;

// Check your inbox for the email address associated with your Pinterest account.
// Look for a message with the subject line "Please confirm your email"
// Open the email and click Confirm your email.
