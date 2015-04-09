 (function(){
  'use strict';
  angular.module('app.game', [])
    .factory('game', function (gameMessenger, $rootScope) {

      var players = [];
      var playersReady = 0;
      var judge;
      var prompt;
      var memes = [];   
      var winner;   

      gameMessenger.on('playerJoined', function(data, sender) {
        var player = { name: sender };
        players.push(player);
        trigger('playerJoined', player);
        if (players.length === 3) {
          trigger('enoughPlayers');
        }
      });

      gameMessenger.on('ready', function(data, sender) {
        playersReady++;
        if (playersReady >= 3 && playersReady === players.length) {
          judge = players[0];
          trigger('gameStart');
          for (var i=0; i<players.length; i++) {
            gameMessenger.start(players[i].name, { role: players[i] === judge ? 'judge' : 'player' });
          }
        }
      });

      gameMessenger.on('submit', function(data, sender) {
        if (data.prompt) {
          trigger('promptSubmitted', data.prompt);
          prompt = data.prompt;
          for (var i=0; i<players.length; i++) {
            if (players[i] !== judge) {
              gameMessenger.promptSubmitted(players[i].name, data);
            }
          }
        }
        if (data.meme) {
          trigger('memeSubmitted', sender);
          for (var i=0; i<players.length; i++) {
            if (players[i].name === sender) {
              players[i].meme = data.meme;
              memes.push({ name: players[i].name, meme: data.meme });
              break;
            }
          }
          if (memes.length === players.length-1) {
            trigger('allSubmitted');
            gameMessenger.startJudging(judge.name, { memes: memes });
          }
        }
      });

      gameMessenger.on('selectWinner', function(data, sender) {
        trigger('winnerSelected', data);
        winner = data;
        gameMessenger.done();
      });

      // Building event handling system

      var eventHandlers = {};

      var registerEventHandler = function(event, handler) {
        eventHandlers[event] = handler;
      };

      var trigger = function(event, data) {
        if (eventHandlers[event]) {
          $rootScope.$apply(function() {
            eventHandlers[event](data)
          });
        }
      };

      var getPrompt = function() {
        return prompt;
      };

      var getMemes = function() {
        return memes;
      };

      var getWinner = function() {
        return winner;
      };

      return {
        on: registerEventHandler,
        getPrompt: getPrompt,
        getMemes: getMemes,
        getWinner: getWinner
      };

    });
  })();