var bodyParser = require('body-parser');
var memeController = require('../memes/memeController.js');

module.exports = function (app, express) {

  app.use(express.static(__dirname + '/../../client'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.get('/memes', memeController.getMemes);
  app.get('/memes/create', memeController.createMeme);
};
