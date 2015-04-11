(function() {
  'use strict';

  angular
    .module('app.winner')
    .controller('Winner', Winner);

    Winner.$inject = ['$state', 'game'];

    function Winner($state, game) {
      var vm = this;

      vm.winner = game.getWinner();

      game.on('startNextRound', function() {
        $state.go('home.waiting');
      });

    }

})();