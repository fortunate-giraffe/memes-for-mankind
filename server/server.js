'use strict';
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var dbUsername = process.env.dbUsername;
var dbPassword = process.env.dbPassword;

mongoose.connect('mongodb://'+ dbUsername + ':'+ dbPassword +'@ds061621.mongolab.com:61621/heroku_app35497814');

require('./config/middleware.js')(app, express);

module.exports = app;
