'use strict';

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('../config.json');

var mongoose = require("mongoose");
var mongodb = config.mongo_db_address;

mongoose.connect(mongodb, {useNewUrlParser: true});

var app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(session({
  secret: config.app_secret_hash_key,
  resave: false,
  saveUninitialized: true
}));

//define controllers
var loginController = require('./controllers/loginController');
var meetingController = require('./controllers/meetingController');
var courseController = require('./controllers/courseController');
var ohController = require('./controllers/createOhController');

//hook up routes
app.use('/', loginController);
app.use('/', meetingController);
app.use('/', courseController);
app.use('/', ohController);

if (!module.parent) {
  // Start the server
  app.listen(config.server_port);
  console.log('Listening on port ' + config.server_port);
}

module.exports = app;
