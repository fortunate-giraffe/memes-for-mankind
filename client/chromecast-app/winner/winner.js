(function() {
  'use strict';

  angular
    .module('app.winner')
    .controller('Winner', Winner);

    Winner.$inject = ['game'];

    function Winner(game) {
      var vm = this;

      vm.winner = game.getWinner();

    }

})();