import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth';
import bodyParser from 'body-parser';

import router from './server/routes';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8080;

const app = express();

app.use((req, res, next) => {
  global.host = req.protocol + '://' + req.get('host');
  next();
});

app.use(passport.initialize());
const facebookStrategy = FacebookStrategy.Strategy;
const googleStrategy = GoogleStrategy.OAuth2Strategy;

passport.authenticate('facebook');
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${global.host}/api/v1/auth/facebook/callback`,
      profileFields: ['emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      const {
        last_name: lastName,
        first_name: firstName,
        email
      } = profile._json;
      done(null, { firstName, lastName, email });
    }
  )
);

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${global.host}/api/v1/auth/google/callback`,
      profileFields: ['emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      const {
        email,
        family_name: lastName,
        given_name: firstName
      } = profile._json;
      done(null, { firstName, lastName, email });
    }
  )
);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve any static files
app.use(express.static(path.join(__dirname, 'build')));

// Logo displayed in sent emails
app.get('/email-logo.png', function(req, res) {
  res.sendFile(path.join(__dirname, 'server', 'email-template', 'logo.png'));
});

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.info(`Started up the server at port ${port}`);
});
