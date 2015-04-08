 (function(){
  'use strict';
  angular.module('app.game', ['app.game-messenger'])
    .factory('game', function (gameMessenger) {
      //player joins
      var players = [];
      var playersReady = 0;
      var judge;
      var prompt;
      var memes = [];      

      gameMessenger.on('playerJoined', function(data, sender) {
        //add player to storage array
        players.push({ name: sender });
      });

      gameMessenger.on('ready', function(data, sender) {
        playersReady++;
        if (playersReady >= 3 && playersReady === players.length) {
          judge = players[0];
          for (var i=0; i<players.length; i++) {
            gameMessenger.start(players[i].name, { role: players[i] === judge ? 'judge' : 'player' });
          }
        }
      });

      gameMessenger.on('submit', function(data, sender) {
        if (data.prompt) {
          prompt = data.prompt;
          for (var i=0; i<players.length; i++) {
            if (players[i] !== judge) {
              gameMessenger.promptSubmitted(players[i].name, data);
            }
          }
        }
        if (data.meme) {
          for (var i=0; i<players.length; i++) {
            if (players[i].name === sender) {
              players[i].meme = data.meme;
              memes.push({ name: players[i].name, meme: data.meme });
              break;
            }
          }
          if (memes.length === players.length-1) {
            gameMessenger.startJudging(judge.name, { memes: memes });
          }
        }
      });

      gameMessenger.on('selectWinner', function(data, sender) {
        gameMessenger.done();
      });


      return {};

    });
  })();