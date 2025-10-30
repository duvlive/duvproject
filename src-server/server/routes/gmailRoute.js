
import GmailController from '../controllers/oauthController.js';

const gmailRoutes = (router) => {
  
  router
    .route('/api/v1/gmail/auth')
    .get(GmailController.getAuthUrl);

  
  router
    .route('/api/v1/gmail/oauth2callback')
    .get(GmailController.getTokens);
};

export default gmailRoutes;
