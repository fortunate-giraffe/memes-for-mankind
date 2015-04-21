'use strict';
var request = require('request');
var querystring = require('querystring');
var Prompt = require('./promptModel.js');

module.exports = {


  /*
  method: getHeadlines retrieves 10 random headlines from New York Times API
  return: JSON array of headline objects
    [
      headline:
      {
        // USE MAIN
        main:"Tsunami Advisory Lifted",
        // DO NOT USE print_headline NOT ALWAYS PRESENT
        print_headline:"Tsunami Advisory Lifted",
      },

      ...more headlines
    ]
  */
  getHeadlines: function(req, res){
    var url = createNYTUrl();
    request(url, function (err, response, body) {
      if (!err && response.statusCode === 200) {
        body = JSON.parse(body);
        res.status(200).send(body.response.docs);
      if( err ) { console.log('REQUEST ERROR: ', err); }
      }
    });
  },

  getWhiteCards: function(req, res){
    Prompt.whitecards.findRandom().limit(10).exec(function(err, cards) {
      if( err ) { return err; }
      res.status(200).send({ result: cards });
    });
  }

};

function randomPage(){
  return Math.floor(Math.random() * 100);
}

function createNYTUrl(){
  var host = 'http://api.nytimes.com/';
  var path = 'svc/search/v2/articlesearch.json?';
  var query = querystring.stringify({
    fl: 'headline',
    'api-key': process.env.nytKey,
    page: randomPage()
  });
  return host + path + query;
}

