var http = require('http');
var querystring = require('querystring');

var creds = require('../config/creds.js');


module.exports = {

  /*
  method: getMemes retrieves the 12 most popular memes from API
  return: JSON array of meme objects
    {
      success: true
      result: [
      {
        generatorID: 3466964,
        displayName: "Kermit The Frog Drinking Tea",
        urlName: "Kermit-The-Frog-Drinking-Tea",
        totalVotesScore: 21,
        imageUrl: "http://cdn.meme.am/images/400x/11590722.jpg", // IMAGE WITHOUT WORDS
        instanceID: 60884204,
        textO: "Hilarious top text", // TOP TEXT
        text1: "More hilarious bottom text", // BOTTOM TEXT
        instanceImageUrl: "http://cdn.meme.am/instances/400x/60884204.jpg",
        instanceUrl: "http://memegenerator.net/instance/60884204"
      },
      {
        ... more meme objects
      }
      ]
    }
   */
  getMemes: function(request, response, next){
    var options = {
      host: 'version1.api.memegenerator.net',
      path: '/Instances_Select_ByPopular?languageCode=en',
      method: 'GET'
    };
    return http.get(options, function(res){
      var body = '';
      res.on('data', function(chunk){
        body += chunk;
      }).on('error', function(e){
        console.log('GOT ERROR: ' + e.message);
      }).on('end', function(){
        response.status(200).send(body);
      });
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
  createMeme: function(request, response, next){

    var postData = querystring.stringify({
      'username': creds.username,
      'password': creds.password,
      'languageCode': 'en',

      // Required from client
      'generatorID': request.body.generator_id || 45,
      'imageID': request.body.imageID || 20,
      'text0': request.body.topText || 'toptext',
      'text1': request.body.bottomText || 'bottomtext'
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

  memeInfo: function(){
    // PASS
  }
};

