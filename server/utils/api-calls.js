'use strict';
var http = require('http');
var request = require('request');
var querystring = require('querystring');
var Meme = require('../memes/memeModel.js');

module.exports = {

  getNewMemeGenerators: function(){
      var options = {
        host: 'version1.api.memegenerator.net',
        path: '/Generators_Select_ByPopular?pageSize=20&pageIndex=20',
        method: 'GET'
      };
      return http.get(options, function(res){
        var body = '';
        res
          .on('data', function(chunk){
            body += chunk; })
          .on('error', function(e){
            console.log('GOT ERROR: ' + e.message); })

          .on('end', function(){
            var memes = JSON.parse(body).result;
            var len = memes.length;

            for( var i = 0; i < len; i++ ){
              (function(i){
                Meme.find({generatorID: memes[i].generatorID}, function(err, results){
                  if( results.length === 0 ){
                    console.log('no results!');
                    var entry = new Meme({
                      generatorID: memes[i].generatorID,
                      displayName: memes[i].displayName,
                      urlName: memes[i].urlName,
                      totalVotesScore: memes[i].totalVotesScore,
                      imageUrl: memes[i].imageUrl,
                      instancesCount: memes[i].instancesCount,
                      ranking: memes[i].ranking,
                      context: ''
                    });
                    entry.save();
                  } else {
                    console.log('results!');
                  }
                });
              })(i);
            }
        });
      });
    },

    getContextForMemes: function(){
      var stream = Meme.find().stream();
        stream.on('data', function(doc){
          var url = createUrl(doc.generatorID, doc.urlName);

          request(url, function (err, response, body) {
            console.log(body);
            if (!err && response.statusCode === 200) {
              body = JSON.parse(body);
              doc.context = body.result.description;
              doc.save();
            if( err ) { console.log('REQUEST ERROR: ', err); }
          }
        });
      }).on('error', function (err) {
        console.log('DB STREAM ERROR: ', err);
      }).on('close', function () {
        console.log('STREAM IS CLOSED');
      });

      function createUrl(genID, urlName){
        var host = 'http://version1.api.memegenerator.net/';
        var path = 'Generator_Select_ByUrlNameOrGeneratorID?';
        var query = querystring.stringify({
          generatorID: genID,
          urlName: urlName
        });
        return host + path + query;
      }
    }
};
