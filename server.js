const express = require('express');
const port = parseInt(process.env.PORT, 10) || 8080;
const path = require('path');
const app = express();

// Serve any static files
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.info(`Started up at port ${port}`);
});
