 (function(){
  'use strict';
  angular.module('app.game', [])
    .factory('game', function (gameMessenger, $rootScope) {

      // setup once per game
      var players = [];
      var playersReady = 0;

      // updated each round
      var judgeIndex = 0;
      var rounds = [];
      var currentRound;

      var startRound = function() {
        currentRound = {
          judge: players[judgeIndex],
          memes: []
        };
        rounds.push(currentRound);
        judgeIndex = (judgeIndex + 1) % players.length;

        // notify controllers
        trigger('gameStart');

        // notify players
        for (var i=0; i<players.length; i++) {
          gameMessenger.start(players[i].name, { role: players[i] === currentRound.judge ? 'judge' : 'player' });
        }
      };

      // Game-level events
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
          startRound();
        }
      });

      // Round-level events
      gameMessenger.on('submit', function(data, sender) {
        if (data.prompt) {
          currentRound.prompt = data.prompt;
          trigger('promptSubmitted', data.prompt);
          for (var i=0; i<players.length; i++) {
            if (players[i] !== currentRound.judge) {
              gameMessenger.promptSubmitted(players[i].name, data);
            }
          }
        }
        if (data.meme) {
          trigger('memeSubmitted', sender);
          for (var i=0; i<players.length; i++) {
            if (players[i].name === sender) {
              players[i].meme = data.meme;
              currentRound.memes.push({ name: players[i].name, meme: data.meme });
              break;
            }
          }
          if (currentRound.memes.length === players.length-1) {
            trigger('allSubmitted');
            gameMessenger.startJudging(currentRound.judge.name, { memes: currentRound.memes });
          }
        }
      });

      gameMessenger.on('selectWinner', function(data, sender) {
        currentRound.winner = data;
        trigger('winnerSelected', data);
        gameMessenger.done();
      });

      gameMessenger.on('startNextRound', function () {
        startRound();
        trigger('startNextRound');
      });

      // Event handling
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
        return currentRound.prompt;
      };

      var getMemes = function() {
        return currentRound.memes;
      };

      var getWinner = function() {
        return currentRound.winner;
      };

      var started = function() {
        return rounds.length > 0;
      }
      return {
        on: registerEventHandler,
        getPrompt: getPrompt,
        getMemes: getMemes,
        getWinner: getWinner,
        started: started
      };

    });
  })();