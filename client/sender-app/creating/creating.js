(function() {
  'use strict';

  angular
      .module('app.creating')
      .controller('Creating', Creating);

  Creating.$inject = ['playerMessenger', 'playerUser', 'dataService', '$state'];

  function Creating(playerMessenger, playerUser, dataService, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.meme = playerUser.getMemeChoice().imageUrl;
    vm.submitCreation = submitCreation;
    vm.bottomText = '';
    vm.topText = '';

    // example function to submit created meme
    function submitCreation() {
      if( vm.bottomText || vm.topText ){

        var generatorID = playerUser.getMemeChoice().generatorID;
        var imageID = retrieveImageID(playerUser.getMemeChoice().imageUrl);
        var displayName = playerUser.getMemeChoice().displayName;
        var imageUrl = playerUser.getMemeChoice().imageUrl;
        var memeRequestObj = {
          imageUrl: imageUrl, // using
          displayName: displayName, // using
          bottomText: vm.bottomText, // using
          topText: vm.topText, // using
          imageID: imageID, // backwards compatibility with old dbase
          generatorID: generatorID // backwards compatibility with old dbase
        };
        // send meme to chromecast so it can request creation from the server
        playerMessenger.submit({meme: memeRequestObj});

        $state.go('home.waiting');
      }
    }

    // TODO: refactor to accept custom regex
    function retrieveImageID(url){
      url = url.split('.');
      url = url[url.length - 2];
      url = url.split('/');
      return url[url.length - 1];
    }
  }
})();
