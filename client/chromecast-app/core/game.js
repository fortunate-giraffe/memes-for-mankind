 (function(){
  'use strict';
  angular.module('app.game', ['app.game-messenger'])
    .factory('game', function (gameMessenger) {
      //player joins
      var players = [];
      var playersReady = 0;
      var judge;

      gameMessenger.on('playerJoined', function(data, sender) {
        //add player to storage array
        players.push(sender);
      });

      gameMessenger.on('ready', function(data, sender) {
        playersReady++;
        if (playersReady >= 3 && playersReady === players.length) {
          judge = players[0];
          for (var i=0; i<players.length; i++) {
            gameMessenger.start(players[i], { role: players[i] === judge ? 'judge' : 'player' });
          }
        }
      });

      return {};

    });
  })();