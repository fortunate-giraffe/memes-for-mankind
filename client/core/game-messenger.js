(function(){
  'use strict';
  angular.module('app.game-messenger', ['app.messaging'])
    .factory('gameMessenger', function (messenger) {

      // TODO: move message queueing to messenger, issue #79
      var allSet = false;
      var queuedMessages = [];
  
      // TODO: see if we can move event handling to messenger, issue #82
      // Supported Events:
      // - playerJoined
      // - ready
      // - submit (meme or prompt) -- game will have to know whether player is the judge to determine which
      // - selectWinner (winner)
      var eventHandlers = {};

      init();

      return {
        start: start,
        startJudging: startJudging,
        done: done,
        on: registerEventHandler
      };

      function init () {
        messenger.onready(function () {
          messenger.initAsUser('ChromeCast');
          allSet = true;

          messenger.onmessage(function (type, data, sender) {
            var handler = eventHandlers[type];
            handler && handler(data, sender);
          });
        });
      }

      function send (type, data, recipient) {
        if (!allSet) {
          queuedMessages.push([type, data, recipient]);
        } else {
          messenger.send(type, data, recipient);
        }
      }

      function start (recipient, role) {
        send('gameStarted', role, recipient);
      }
      
      // Question: do we pass the memes, or just trigger the judge
      // to retrieve the memes from the server?
      function startJudging (judge, memes) {
        send('startJudging', memes);
      }

      function done () {
        messenger.broadcast('done');
      }

      function registerEventHandler (event, handler) {
        eventHandlers[event] = handler;
      }

    })

})();