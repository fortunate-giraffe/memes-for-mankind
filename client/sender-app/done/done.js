(function() {
  'use strict';

  angular
      .module('app.done')
      .controller('Done', Done);

  Done.$inject = ['playerMessenger', 'playerUser'];

  function Done(playerMessenger, playerUser) {
    /*jshint validthis: true */
    var vm = this;
    vm.cordova = (window.cordova) ? true : false;

    vm.winningMeme = playerUser.getWinner();

    vm.startNextRound = playerMessenger.startNextRound;

    vm.mobileShare = mobileShare;

    function mobileShare() {
      console.log('mobileshare called!');
      window.plugins.socialsharing.share('Check out this Meme we made playing MemesForMankind!', null, null, vm.winningMeme.meme.instanceImageUrl);
    }
  }
})();
