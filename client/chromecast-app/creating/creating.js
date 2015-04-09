(function() {
  'use strict';

  angular
    .module('app.creating')
    .controller('Creating', Creating);

    Creating.$inject = ['game', '$state'];

    function Creating(game, $state) {
      var vm = this;
      
      //example data
      vm.players = ["Rich", "Roger", "Andy", "Rebecca"];

      game.on('memeSubmitted', function(player) {
        vm.players.push(player);
      });

      game.on('allSubmitted', function() {
        $state.go('home.choosing');
      });

    }

})();