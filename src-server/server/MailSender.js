/* eslint-disable no-console */
"use strict";
import nodemailer from 'nodemailer';
import ejs from 'ejs';
// import sgMail from '@sendgrid/mail';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import textEmailTemplate from './email-template/duv-text-email-template';
const DUV_LIVE_NO_REPLY_EMAIL = 'DUV LIVE <donotreply@duvlive.com>';
const DUV_LIVE_INFO_EMAIL = 'DUV LIVE <info@duvlive.com>';
const emailLogo = `https://duvlive.com/email-logo.png`;


const mgClient = new Mailgun(formData);
const mg = mgClient.client({ username: 'api', key: process.env.MAILGUN_API_KEY });


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
    'h:Reply-To': options.userEmail || DUV_LIVE_INFO_EMAIL,
  };

  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, message);
    console.log(result);
    return result;
  }

  catch (error) {
    console.error('Mailgun send error:', error && error.toString ? error.toString() : error);
  }


  return result;



  // Prefer SendGrid API when available (Railway often blocks SMTP ports)
  // if (process.env.SENDGRID_API_KEY) {
  //   try {
  //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  //     const sgMessage = {
  //       to: message.to,
  //       from: message.from,
  //       subject: message.subject,
  //       text: message.text,
  //       html: message.html,
  //       replyTo: message.replyTo,
  //     };

  //     const [response] = await sgMail.send(sgMessage);
  //     // SendGrid returns an array of responses for each recipient
  //     console.log('SendGrid response statusCode:', response && response.statusCode);
  //     return result;
  //   } catch (err) {
  //     console.error('SendGrid send error:', err && err.toString ? err.toString() : err);
  //     if (err && err.response && err.response.body) {
  //       console.error('SendGrid error body:', err.response.body);
  //     }
  //     // fallthrough to SMTP fallback if configured
  //   }
  // }

  // // Fallback to SMTP using nodemailer (useful for local/dev or when SMTP isn't blocked)
  // let transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_SERVER || 'smtp.mailtrap.io',
  //   port: process.env.EMAIL_PORT || 2525,
  //   secure: !!process.env.EMAIL_SECURE || false,
  //   auth: {
  //     user: process.env.EMAIL_USER || process.env.MAIL_TRAP_USER,
  //     pass: process.env.EMAIL_PASS || process.env.MAIL_TRAP_PASS,
  //   },
  // });

  // // send mail with defined transport object
  // let info = await transporter.sendMail(message);

  // console.log('Message sent: %s', info.messageId);
  // // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // return info;
}
