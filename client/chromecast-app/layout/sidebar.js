(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['game'];

    function Sidebar(game) {
      var vm = this;
      vm.judge;
      vm.players = [];

      game.on('playerJoined', function(player) {
        var playerObj = {};
        playerObj.name = player.name;
        playerObj.status = false;
        vm.players.push(playerObj);
      });

      game.on('gameStart', function() {
        vm.judge = game.getJudge();
        console.log(vm.judge);
      });

      game.on('playerReady', function(player) {
        vm.players.forEach(function(plur){
          if( plur.name === player ) {
            plur.status = true;
          }
        });
      });
    }

})();
