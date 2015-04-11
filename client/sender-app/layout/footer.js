(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Footer', Footer);

  Footer.$inject = ['playerMessenger'];

  function Footer(playerMessenger) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Footer';
    
    vm.allowNextRound = false;
    playerMessenger.on('gameStarted', function () {
      vm.allowNextRound = false;
    });

    playerMessenger.on('done', function () {
      vm.allowNextRound = true;
    });

    vm.startNextRound = playerMessenger.startNextRound;
  }
})();
