(function() {
  'use strict';

  angular
      .module('app.done')
      .controller('Done', Done);

  Done.$inject = ['playerMessenger', 'playerUser'];

  function Done(playerMessenger, playerUser) {
    /*jshint validthis: true */
    var vm = this;

    vm.winningMeme = playerUser.getWinner();

    vm.startNextRound = playerMessenger.startNextRound;
  }
})();
