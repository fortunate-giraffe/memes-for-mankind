(function(){
  'use strict';
  angular.module('app.game-messenger', [])
    .factory('gameMessenger', gameMessenger);

    gameMessenger.$inject = ['messenger', 'events'];

    function gameMessenger (messenger, events) {

      // Supported Events:
      // - playerJoined
      // - ready
      // - submit (meme or prompt) -- game will have to know whether player is the judge to determine which
      // - selectWinner (winner)
      messenger.onmessage(events.trigger);
      messenger.init('ChromeCast');

      return {
        start: start,
        promptSubmitted: promptSubmitted,
        startJudging: startJudging,
        done: done,
        on: events.on
      };

      function start (recipient, role) {
        messenger.send('gameStarted', role, recipient);
      }

      function promptSubmitted (recipient, prompt) {
        messenger.send('promptSubmitted', prompt, recipient);
      }

      function startJudging (judge, memes) {
        messenger.send('startJudging', memes, judge);
      }

      function done (winningMeme) {
        messenger.broadcast('done', winningMeme);
      }
    }
})();