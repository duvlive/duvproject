'use strict';
import nodemailer from 'nodemailer';
import ejs from 'ejs';

export function generateEmailTemplate(options) {
  return new Promise((resolve, reject) => {
    return ejs.renderFile(
      __dirname + '/email-template/duv-html-email-template.ejs',
      options,
      function(err, data) {
        if (err) {
          return reject(err);
        } else {
          console.log(data);
          return resolve(data);
        }
      }
    );
  });
}

// async..await is not allowed in global scope, must use a wrapper
export default async function emailSender(email, token, title) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS
    }
  });

  let subject = title ? title : 'Activate Your Duv Live Account';
  let link = title
    ? `${global.host}/api/v1/users/update-password?token=${token}`
    : `${global.host}/api/v1/users/activate?token=${token}`;

  // Generate html mail
  const options = {
    // firstName: '[FirstName]',
    contentTop:
      "You (or someone pretending to be you) requested a password reset for your account. If you didn't made this request you can ignore this email.",
    contentBottom:
      "If you didn't request a password reset, let us know as soon as possible",
    ButtonText: 'Activate Your Account',
    ButtonLink: link
  };
  const html = await generateEmailTemplate(options);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'DUV LIVE <no-reply@duv.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `<a href=${link} /> Click here </a>`, // plain text body
    html
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
