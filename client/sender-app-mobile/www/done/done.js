(function() {
  'use strict';

  angular
      .module('app.done')
      .controller('Done', Done);

  Done.$inject = ['playerMessenger'];

  function Done(playerMessenger) {
    /*jshint validthis: true */
    var vm = this;
    vm.startNextRound = playerMessenger.startNextRound;
  }
})();
