'use strict';
// put compression needs to be first here, instead of in middleware file
var compress = require('compression');
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var dbUsername = process.env.dbUsername;
var dbPassword = process.env.dbPassword;

// this must come first for compression to work properly with Express 4.x
app.use(compress());

mongoose.connect('mongodb://'+ dbUsername + ':'+ dbPassword +'@ds061621.mongolab.com:61621/heroku_app35497814');

require('./config/middleware.js')(app, express);

module.exports = app;
