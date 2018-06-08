var http = require('http'),
    fs = require('fs');
const express = require('express');
const app = express();
const {getIndex, getCallback} = require("./controller.js");

const router = express.Router();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

  app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

  router.use('/index', getIndex);
  router.use('/callback', getCallback);

  app.use('/', router);
// const hostname = '127.0.0.1';
// const port = 3000;



module.exports = app;
