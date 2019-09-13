import 'dotenv/config';
import express from 'express';
import path from 'path';
import logger from "morgan";
import bodyParser from "body-parser";
import router from './server/routes';

const port = parseInt(process.env.PORT, 10) || 8080;

// Set up the express app
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

// Serve any static files
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.info(`Started up at port ${port}`);
});
