(function (){
  'use strict';
  angular
    .module('app.data-service', ['app.player-user'])
    .factory('dataService', function (playerUser, $http, $q) {
      
      // factory for pulling data
      var serverPath = 'http://localhost:8000'; //'https://thawing-eyrie-5425.herokuapp.com';

      return {
        getMemes: getMemes,
        createMeme: createMeme
      };

      // function for getting 10 meme templates from our server (or player submissions)
      function getMemes() {
        // check if they're the judge, if so, return player submissions 
        // right now storing these in the playerUser factory... 
        // TODO rethink where/how we store these
        console.log('calling getMemes');
        if (playerUser.getRole() === 'judge') {
          console.log('player is judge');

          // Here we grab the list of memes to judge from the playerUser factory
          var memeList = playerUser.getJudgeMemeList();
          var returnObj = {
            result: memeList
          };
          // now we construct a 'fake' promise with the synchronously grabbed memes to judge
          // we need to do this because the controller is expecting a promise (doesn't hurt)
          var deferred = $q.defer();
          deferred.resolve(returnObj);
          return deferred.promise;
        } else { //otherwise get 10 memes
          // return promise for the async call to the server
          // we wrap the $http promise with a $q promise for continuity with the above
          var deferred = $q.defer();
          $http.get(serverPath + '/memes')
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(deferred.resolve);
          return deferred.promise;
        }
      }    

      // function for getting url of newly created meme
      function createMeme(topText, bottomText, generatorID, imageID) {
        // return promise on the async call to the server to create a meme
        var requestData = {
          'generatorID': generatorID,
          'imageID': imageID,
          'topText': topText,
          'bottomText': bottomText
        };
        return $http.post(serverPath + '/memes/create', requestData);
      }


    });
})();