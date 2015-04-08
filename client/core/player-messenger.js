(function (){
'use strict';
angular.module('app.player-messenger', ['app.messaging'])
  .factory('playerMessenger', function (messenger) {
    
    // TODO: get rid of these! make gameRecipient an app constant, user a service, maybe defer to messenger
    var gameRecipient = 'ChromeCast'; 

    var allSet = false;
    var queuedMessages = [];

    // Supported events: 
    // - gameStarted (role) - round started
    // - promptSubmitted (prompt) - register on non-judge players
    // - startJudging - register on judge, all memes are in
    // - done - round over
    var eventHandlers = {};

    return {
      init: init,
      join: join,
      ready: ready,
      submit: submit,  //prompt or meme
      selectWinner: selectWinner,
      on: registerEventHandler
    };

    function init (name) {
      console.log('calling init');
      messenger.onready(function () { 
        messenger.initAsUser(name);  

        allSet = true;
        queuedMessages.forEach(function (msg) {
          send.apply(undefined, msg);
        });

        messenger.onmessage(function (type, data, sender) {
          var handler = eventHandlers[type];
          handler && handler(data, sender);
        });
      });
    }

    function send (type, data, recipient) {
      recipient = recipient || gameRecipient; // player almost(?) always send messages to the game
      if (!allSet) {
        queuedMessages.push([type, data, recipient]);
      } else {
        messenger.send(type, data, recipient);
      }
    }

    function join () {
      send('playerJoined');
    }

    function ready () {
      send('ready');
    }

    function submit (data) {
      send('submit', data);
    }

    function selectWinner (winner) {
      send('selectWinner', winner);
    }

    function registerEventHandler (event, handler) {
      eventHandlers[event] = handler;
    }

  });
})();