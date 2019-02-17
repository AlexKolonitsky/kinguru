'use strict';

const fs = require('path');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
require('dotenv').config();
const PORT = process.env.PORT || 80;
const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(errorHandler());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// app.use('/', router);

app.use('/', express.static(path.join(__dirname, '../frontend')));

app.use((err, req, res, next) => {

  if (err.inner && err.inner.name === 'TokenExpiredError') {
    console.error('Token error ' + err.inner.name);
    res.status(401).send('Token is expired');
  }

  if (err.code === 'invalid_token') {
    console.error('Error in token format ' + err.inner.message);
    res.status(401).send('Token is not valid');
  }

});

if (require.main === module){ 
  app.listen(PORT, () => {
    console.log(`Local server run on port ${PORT}`)
  });
}

module.exports = app;