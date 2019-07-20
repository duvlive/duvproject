const express = require('express');
const port = parseInt(process.env.PORT, 10) || 8080;
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/ping', function(req, res) {
  return res.send('pong');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.info(`Started up at port ${port}`);
});
