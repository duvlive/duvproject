'use strict';
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async function emailSender(email, token, title, host) {
  if (global.window) {
    host = global.window.location.hostname;
  } else {
    host = host ? host : 'localhost:8080';
  }
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.TESTACCOUNT_USER,
      pass: process.env.TESTACCOUNT_PASS
    },
  });

  let subject = title ? title : 'Activate Your Duv Live Account';
  let link = title ? `${host}/api/v1/users/update-password?token=${token}` : `${host}/api/v1/users/activate?token=${token}`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
      from: 'DUV LIVE <no-reply@duv.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `<a href=${link} /> Click here </a>`, // plain text body
      html: `<b><a href=${link} /> Click here </a></b>`, // html body
  }
);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
