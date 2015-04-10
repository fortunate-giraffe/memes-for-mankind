(function() {
  'use strict';

  angular
    .module('app.choosing')
    .controller('Choosing', Choosing);

    Choosing.$inject = ['game', '$state'];

    function Choosing(game, $state) {
      var vm = this;
      
      vm.submissions = game.getMemes();

      game.on('winnerSelected', function() {
        $state.go('home.winner');
      });

    };

})();