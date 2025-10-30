import dotenv from 'dotenv';
import { google } from 'googleapis';
import db from '../models'; // your Sequelize models

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_EMAIL_CLIENT_ID,
  process.env.GOOGLE_EMAIL_CLIENT_SECRET,
  process.env.GOOGLE_EMAIL_REDIRECT_URI
);

const GmailController = {
  async getAuthUrl(req, res) {
    try {
      const scopes = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose',
      ];

      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
      });

      return res.redirect(url);
    } catch (error) {
      console.error('Error generating auth URL:', error);
      return res.status(500).json({ message: 'Error generating Google Auth URL' });
    }
  },

  async getTokens(req, res) {
    const { code } = req.query;

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      
      await db.GoogleToken.upsert({
        id: 1, 
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
        expiry_date: tokens.expiry_date,
      });

      return res.status(200).json({
        message: 'Google tokens saved successfully',
        tokens,
      });
    } catch (error) {
      console.error('Error retrieving Google tokens:', error);
      return res.status(500).json({
        message: 'Error retrieving Google tokens',
        error: error.message,
      });
    }
  },
};

export default GmailController;
