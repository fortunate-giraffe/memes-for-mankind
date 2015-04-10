(function (){
'use strict';
angular.module('app.player-messenger', [])
  .factory('playerMessenger', playerMessenger);

  playerMessenger.$inject = ['messenger', 'localDev', 'appID'];  

  function playerMessenger (messenger, localDev, appID) {

    if (!localDev) {
      setUpChromeCast();
    }
    
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
      connect: !localDev ? connectCast : function () {},
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

    function setUpChromeCast () {
      window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
        if (loaded) {
          initializeCastApi();
        } else {
          console.log(errorInfo);
        }
      };
      
      function initializeCastApi () {
        var sessionRequest = new chrome.cast.SessionRequest(appID);
        var apiConfig = new chrome.cast.ApiConfig(
                                sessionRequest, 
                                function(e){  // sessionListener, 
                                  var session = e;
                                  console.dir(session);
                                },
                                receiverListener);
                              
        chrome.cast.initialize(
          apiConfig, 
          function() {console.log('init success!');}, //onInitSuccess
          function() {console.log('initerror!');}); // onError); 
      }

      function receiverListener(e) {
        if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
          console.log('Found a receiver!!!');
          // TODO: trigger devices available event
        }
      }
      
    }
  
    function connectCast () {
      chrome.cast.requestSession(
        function(ccSessionObj) {
          console.log('creating session!');
          console.dir(ccSessionObj);
        }, 
        function() {
          console.log('failed to create session');
        }
      );
    }

  };
})();









