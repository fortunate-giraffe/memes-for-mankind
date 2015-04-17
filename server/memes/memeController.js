'use strict';
var http = require('http');
var querystring = require('querystring');
var Meme = require('./memeModel.js');
var apiCalls = require('../utils/apiCalls.js');

module.exports = {

  /*
  method: getMemes retrieves 10 random memes from DB
  return: JSON array of meme objects
    {
      result: [
      {
        generatorID:2,
        displayName:"Y U No",
        urlName:"Y-U-No",
        totalVotesScore:9290,
        imageUrl:"http://cdn.meme.am/images/400x/166088.jpg",
        instancesCount:2285339,
        ranking:1
        context: 'context for meme goes here'
      },
      {
        ... more meme objects
      }]
    }
   */
  getMemes: function(request, response){
    Meme.findRandom().limit(10).exec(function(err, memes){
      if( err ) { return err; }
      response.status(200).send({ result: memes });
    });
  },

  /*
  method: createMeme passes user data to meme api
  return: single JSON meme object
    {
      success: true,
      result:
        {
          generatorID: 45,
          displayName: "Insanity Wolf",
          urlName: "Insanity-Wolf",
          totalVotesScore: 0,
          imageUrl: "http://cdn.meme.am/images/400x/20.jpg",
          instanceID: 61018597,
          text0: "toptext",
          text1: "bottomtext",
          instanceImageUrl: "http://cdn.meme.am/instances/400x/61018597.jpg", // CONTAINS MEME IMAGE
          instanceUrl: "http://memegenerator.net/instance/61018597"
        }
    }
   */
  createMeme: function(request, response){
    var postData = querystring.stringify({
      'username': process.env.memegenUsername,
      'password': process.env.memegenPassword,
      'languageCode': 'en',

      // Required from client
      'generatorID': request.body.generatorID,
      'imageID': request.body.imageID,
      'text0': request.body.topText,
      'text1': request.body.bottomText
    });

    var options = {
      hostname: 'version1.api.memegenerator.net',
      path: '/Instance_Create?',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      var body = '';

      res.on('data', function (chunk) {
        body += chunk;
        console.log('BODY: ' + chunk);
        response.status(200).send(body);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();
  },
};
