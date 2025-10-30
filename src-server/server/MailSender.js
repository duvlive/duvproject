/* eslint-disable no-console */
"use strict";
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { google } = require("googleapis");
// const db = require("./models"); 
const textEmailTemplate = require("./email-template/duv-text-email-template");

const DUV_LIVE_NO_REPLY_EMAIL = { email: "donotreply@duvlive.com", name: "DUV LIVE" };
const DUV_LIVE_INFO_EMAIL = "duvlive@gmail.com";
const logoPath = path.resolve(__dirname, "email-template/assets/red-white.svg");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_EMAIL_CLIENT_ID,
  process.env.GOOGLE_EMAIL_CLIENT_SECRET,
  process.env.GOOGLE_EMAIL_REDIRECT_URI
);


function generateEmailTemplate(options = {}) {
  console.log(" [generateEmailTemplate] options received:", options);

  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, "email-template/duv-html-email-template.ejs"),
      { ...options, logoPath },
      (err, html) => {
        if (err) {
          console.error("[EJS render error]", err);
          return reject(err);
        }

        console.log(" [generateEmailTemplate] Rendering text version...");
        const text = textEmailTemplate(options || {});
        resolve({ html, text });
      }
    );
  });
}

// Send mail 
async function sendMail(content = {}, user = {}, additionalOptions = {}) {
  console.log(" [sendMail] called with content:", content);
  console.log("[sendMail] user:", user);
  console.log(" [sendMail] additionalOptions:", additionalOptions);
  const db = require("./models");

  const options = {
    ...content,
    ...additionalOptions,
    firstName: user.firstName,
  };

  console.log(" [sendMail] merged options:", options);

  const { html, text } = await generateEmailTemplate(options);

  // Fetch Google OAuth tokens from DB
  const tokenData = await db.GoogleToken.findOne({ where: { id: 1 } });
  if (!tokenData) {
    throw new Error("Google token not found. Run /gmail/auth first.");
  }

  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // Build MIME message 
  const messageParts = [
    `From: "${DUV_LIVE_NO_REPLY_EMAIL.name}" <${DUV_LIVE_NO_REPLY_EMAIL.email}>`,
    `To: ${user.email}`,
    `Reply-To: ${options.userEmail || DUV_LIVE_INFO_EMAIL}`,
    `Subject: ${options.subject || ""}`,
    "MIME-Version: 1.0",
    "Content-Type: multipart/related; boundary=boundary123",
    "",
    "--boundary123",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ];

  // Include the inline logo attachment 
  if (fs.existsSync(logoPath)) {
    const logoContent = fs.readFileSync(logoPath).toString("base64");
    messageParts.push(
      "--boundary123",
      "Content-Type: image/svg+xml",
      "Content-Transfer-Encoding: base64",
      "Content-ID: <duv_logo>",
      "Content-Disposition: inline; filename=duv-logo.svg",
      "",
      logoContent
    );
  }

  messageParts.push("--boundary123--");
  const message = messageParts.join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    console.log(" [Gmail API] Sending message to:", user.email);
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    console.log("[Gmail API result]:", response.data);
    return response.data;
  } catch (error) {
    console.error(" [sendMail] Gmail send failed:", error.message);
    return null;
  }
}

module.exports = sendMail;
