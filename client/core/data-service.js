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
          //return promise to grab the meme URLs from the factory (even though it's not async)
          return $q.when(playerUser.getJudgeMemeList());
        } else { //otherwise get 10 memes
          // return promise for the async call to the server
          return $http.get(serverPath + '/memes');
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