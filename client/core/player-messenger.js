(function (){
'use strict';
angular.module('app.player-messenger', [])
  .factory('playerMessenger', playerMessenger);

  playerMessenger.$inject = ['messenger', 'localDev', 'appID', '$rootScope'];  

  function playerMessenger (messenger, localDev, appID, $rootScope) {
  
    if (!localDev) {
      setUpChromeCast();
      var session;
      var namespace = 'urn:x-cast:vandelay.industries';
      var username;
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
    var trigger = function (event, data, sender) {
      var handlers = eventHandlers[event];
      if (handlers) {
        $rootScope.$apply(function () {
          handlers.forEach(function (fn) {
            fn(data, sender);
          });
        });
      }
    };

    return {
      connect: !localDev ? connectCast : function () {},
      init: init,
      join: join,
      ready: ready,
      submit: submit,  //prompt or meme
      selectWinner: selectWinner,
      startNextRound: startNextRound,
      on: registerEventHandler
    };

    function init (name) {
      console.log('calling init');
      if (localDev) {
        messenger.onready(function () { 
          messenger.initAsUser(name);  

          allSet = true;
          queuedMessages.forEach(function (msg) {
            send.apply(undefined, msg);
          });

          messenger.onmessage(trigger);

        });        
      } else {
        allSet = true; // assumes we've already connected to ChromeCast
        username = name;
      }
    }

    function success (data) {
      console.log('sendMessage success ', data);
    }
    function error (err) {
      console.log('sendMessage error', err);
    }

    function send (type, data, recipient) {
      recipient = recipient || gameRecipient; // player almost(?) always send messages to the game
      if (!allSet) {
        queuedMessages.push([type, data, recipient]);

      } else {

        if (localDev) {
          messenger.send(type, data, recipient);
        } else {
          session.sendMessage(namespace, JSON.stringify({
            type: type, 
            data: data,
            recipient: recipient,
            sender: username
          }), 
          success, 
          error);
        }
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
      // eventHandlers[event] = handler;
      eventHandlers[event] = eventHandlers[event] || [];
      eventHandlers[event].push(handler);
    }

    function startNextRound () {
      send('startNextRound');
    }

    // *** CHROMECAST STUFF BELOW *** //
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
                                sessionListener,
                                receiverListener
                                );
                              
        chrome.cast.initialize(
          apiConfig, 
          function() {console.log('init success!');}, //onInitSuccess
          function() {console.log('init error!');} // onError
        ); 
      }

      function receiverListener (e) {
        if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
          console.log('Found a receiver!!!');
          // TODO: trigger devices available event
        }
      }
      
    }

    function sessionListener (e) {
      session = e;
      console.log('got session');
      session.addUpdateListener(function (isAlive) {
        console.log('session update', isAlive, session);
      });
      session.addMessageListener(namespace, function (namespace, message) {
        console.log('got message!', namespace, message)
        message = JSON.parse(message);
        trigger(message.type, message.data, message.sender);
      });
    }

  
    function connectCast () {
      chrome.cast.requestSession(
        sessionListener, 
        function(err) {
          console.log('failed to create session');
          console.dir(err);
        }
      );
    }

  };
})();









