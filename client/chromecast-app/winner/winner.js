(function() {
  'use strict';

  angular
    .module('app.winner')
    .controller('Winner', Winner);

    Winner.$inject = ['game', '$state'];

    function Winner(game, state) {
      var vm = this;

      vm.winner = game.getWinner();

    }

})();