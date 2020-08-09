import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import router from './server/routes';

dotenv.config();

let options = {};
if (process.env.NODE_ENV === 'development') {
  options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  };
}

const port = parseInt(process.env.PORT, 10) || 4000;

const app = express();

app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

router(app);

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve any static files
app.use(express.static(path.join(__dirname, 'build')));

// Logo displayed in sent emails
app.get('/email-logo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'server', 'email-template', 'logo.png'));
});

app.get('/view-our-work', function (req, res) {
  res.redirect('/');
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, `build`, 'index.html'));
});

app.listen(port, () => {
  console.info(`Started up the server at port ${port}`);
});

if (process.env.HTTPS === 'on') {
  https.createServer(options, app).listen(443, () => {
    console.info(`Started up the server at port 443`);
  });
}
