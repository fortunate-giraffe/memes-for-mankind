'use strict';
var request = require('request');
var memecanvas = require('memecanvas');
var Meme = require('./memeModel.js');

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
  getMemes: function(req, res){
    Meme.curatedmemes.findRandom().limit(8).exec(function(err, memes) {
      if( err ) { return err; }
      res.status(200).send({ result: memes });
    });
  },


  /*
  method: createMeme passes user data to meme api
  return: single JSON meme object
    {
      result:
        {
          instanceImageUrl: 45,
          displayName: "Insanity Wolf",
        }
    }
   */
  createMeme: function(req, res){
    var date = new Date().valueOf();
    var topText = req.body.topText;
    var bottomText = req.body.bottomText;
    var memeTitle = req.body.displayName;
    var imageUrl = req.body.imageUrl;

    download(imageUrl, function(memeTemplate) {
      console.log('successfully downladed image');

      memecanvas.generate(memeTemplate, topText.toUpperCase(), bottomText.toUpperCase(), function(error, memeData) {
        if (error) {
          console.log('error generating meme', error);
          return;
        }

        var options = {
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: { Authorization: 'Client-ID ' + process.env.imgurClientID },
          form: {
            image: new Buffer(memeData, 'binary').toString('base64')
          }
        };

        // Imgur request
        request(options, function(err, response, body) {
          if (err) {
            throw err;
          }
          body = JSON.parse(body);
          imageUrl = body.data.link;
          res.status(200).send({result: {
            instanceImageUrl: imageUrl,
            displayName: memeTitle
          }});
        });

      });
    });
  },
};

function download(uri, callback) {
  var options = {
    uri: uri,
    encoding: null
  };
  request(options, function (error, response, body) {
    callback(new Buffer(body, 'binary'));  //encoding?
  });
}
