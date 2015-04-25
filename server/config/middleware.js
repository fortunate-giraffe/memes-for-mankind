'use strict';
var bodyParser = require('body-parser');
var cors = require('cors');
var memeController = require('../memes/memeController.js');
var promptController = require('../prompts/promptController.js');

module.exports = function (app, express) {

  app.use(cors());
  // explicitly naming all the folders where we're serving our different apps
  app.use('/cc', express.static(__dirname + '/../../client/chromecast-app'));
  app.use('/', express.static(__dirname + '/../../client/sender-app'));
  // and their dependencies
  app.use('/core', express.static(__dirname + '/../../client/core'));
  app.use('/bower_components', express.static(__dirname + '/../../bower_components'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.get('/prompts/whitecards', promptController.getWhiteCards);
  app.get('/prompts/headlines', promptController.getHeadlines);
  app.get('/memes', memeController.getMemes);
  app.post('/memes/create', memeController.createMeme);
};
