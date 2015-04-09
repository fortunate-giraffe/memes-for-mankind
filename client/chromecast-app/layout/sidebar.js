(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['game'];

    function Sidebar(game) {
      var vm = this;
      vm.players = [];

      game.on('playerJoined', function(player) {
        vm.players.push(player);
      });
    }
  
})();