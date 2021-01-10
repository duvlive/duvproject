/* eslint-disable no-console */
'use strict';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
// import sgMail from '@sendgrid/mail';
import textEmailTemplate from './email-template/duv-text-email-template';
const DUV_LIVE_NO_REPLY_EMAIL = 'DUV LIVE <donotreply@duvlive.com>';
const DUV_LIVE_INFO_EMAIL = 'DUV LIVE <info@duvlive.com>';
const emailLogo = `https://duvlive.com/email-logo.png`;

export function generateEmailTemplate(options) {
  return new Promise((resolve, reject) => {
    return ejs.renderFile(
      __dirname + '/email-template/duv-html-email-template.ejs',
      { ...options, emailLogo },
      function (err, html) {
        if (err) {
          return reject(err);
        } else {
          const text = textEmailTemplate(options);
          return resolve({ html, text });
        }
      }
    );
  });
}

// async..await is not allowed in global scope, must use a wrapper
// sendMail(EMAIL_CONTENT.ACTIVATE_YOUR_ACCOUNT, user, options)
export default async function sendMail(content, user, additionalOptions = {}) {
  // Generate html mail
  const options = {
    ...content,
    ...additionalOptions,
    firstName: user.firstName,
  };

  const { html, text } = await generateEmailTemplate(options);

  const message = {
    from: DUV_LIVE_NO_REPLY_EMAIL, // sender address
    to: `${user.email}`, // list of receivers
    subject: `${options.subject}`, // Subject line
    text,
    html,
    replyTo: options.userEmail || DUV_LIVE_INFO_EMAIL,
  };

  // if (process.env.NODE_ENV === 'production') {
  // sgMail.setApiKey(process.env.DUV_LIVE_EMAIL_KEY);

  // async () => {
  //   try {
  //     await sgMail.send(message);
  //   } catch (error) {
  //     console.error(error);

  //     if (error.response) {
  //       console.error(error.response.body);
  //     }
  //   }
  // };
  // } else {
  //   // using smtp
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    secure: !!process.env.EMAIL_SECURE || false,
    auth: {
      user: process.env.EMAIL_USER || process.env.MAIL_TRAP_USER,
      pass: process.env.EMAIL_PASS || process.env.MAIL_TRAP_PASS,
    },
  });
  // ensure userEmail is always present

  // send mail with defined transport object
  let info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // html: ejs.render( fs.readFileSync('e-mail.ejs', 'utf-8') , {mensagem: 'olá, funciona'})
  // }
}
