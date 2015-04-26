(function() {
  'use strict';

  angular
    .module('app.choosing')
    .controller('Choosing', Choosing);

    Choosing.$inject = ['game', '$state'];

    function Choosing(game, $state) {
      var vm = this;
      vm.height = '400px';

      vm.submissions = game.getMemes();

      game.on('winnerSelected', function() {
        $state.go('home.winner');
      });

      if (vm.submissions.length <=2) {
        vm.height = '400px';
      } else if (vm.submissions.length <=6) {
        vm.height = '250px';
      } else if (vm.submissions.length <=9) {
        vm.height = '200px';
      }

    }

})();

