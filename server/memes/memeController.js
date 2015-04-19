'use strict';
var http = require('http');
var fs = require('fs');
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
    Meme.curatedmemes.findRandom().limit(8).exec(function(err, memes){
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
    var memeTemplate = 'tmp/generators/' + date + '.jpg';
    var topText = req.body.topText;
    var bottomText = req.body.bottomText;
    var memeTitle = req.body.displayName;
    var imageUrl = req.body.imageUrl;

    download(imageUrl, memeTemplate, function(){
      console.log('successfully downladed image');

      // Create a temporary folder and define a filename suffix
      memecanvas.init('./tmp/instances', '-instance');

      // If the path is wrong memecanvas will throw a hard error inscrutably called 'error'
      memecanvas.generate(memeTemplate, topText, bottomText, function(error, memefilename){
          if(error){
            console.log('some mysterious ', error);
          } else {
            console.log('successfully saved template at: ', memefilename);

            var imagePath = './tmp/instances/' + date + '-instance.jpg';
            var options = {
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: { Authorization: 'Client-ID ' + process.env.imgurClientID },
              form: {
                image: ''
              }
            };

            fs.readFile(imagePath, {encoding: 'base64'}, function(err, data) {
              if( err ) throw err;
              options.form.image = data;

              // Imgur request
              request(options, function(err, response, body){
                if( err ) {
                  throw err;
                }
                body = JSON.parse(body);
                imageUrl = body.data.link;
                res.status(200).send({result: {
                  instanceImageUrl: imageUrl,
                  displayName: memeTitle
                }});
                // Delete the instance
                fs.unlink('tmp/instances/' + date + '-instance.jpg');
              });
            });
          }
      });
      // Delete the template
      fs.unlink(memeTemplate);
    });
  },
};

function download(uri, filename, callback){
  console.log('made it into download');
  request.head(uri, function(err, res, body){
    if( err ) throw err;
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}
