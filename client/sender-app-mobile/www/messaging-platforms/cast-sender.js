(function() {
  'use strict';

  angular.module('app.cast-sender-NOT-USED-ON-MOBILE', [])
    .factory('castSenderMessenger', castSenderMessenger);

  castSenderMessenger.$inject = ['chromecastNamespace', 'appId'];

  function castSenderMessenger (chromecastNamespace, appId) {
    var gameRecipient = 'ChromeCast';
    var username;
    var session;
    var connected;
    var castInitialized;
    var messageHandler;
    var onreadyHandler;

    setUpChromeCast();

    return {
      init: init,
      connect: connectCast,
      connectionStatus: connectionStatus,
      onready: onready,  // for Cast, it's when a connection is established
      onmessage: onmessage,
      send: send,
      broadcast: function () {}, // players don't broadcast,
    };

    function init (name) {
      username = name;
    }

    function onmessage (handler) {
      messageHandler = handler;
    }

    function onready (handler) {
      onreadyHandler = handler;
    }

    function connectionStatus () {
      return connected;
    }

    // Messaging Functions
    function send (type, data, recipient) {
      recipient = recipient || gameRecipient; // player almost(?) always send messages to the game
      var message = JSON.stringify({
        type: type,
        data: data,
        recipient: recipient,
        sender: username
      });
      session.sendMessage(
        chromecastNamespace,
        message,
        function (data) { console.log('message sent!' + data); },
        function (err) { console.log('message errored!' + err); }
      );
    }

    // Cast Setup Functions
    function connectCast () {
      // checking if we still need to initialize and the cast api has already loaded
      if (!connected && chrome.cast && !castInitialized) {
        console.log('bootstrapping chromecast initialization!');
        initializeCastApi();
      }

      chrome.cast.requestSession(
        sessionListener,
        function(err) { console.dir(err); }
      );
    }

    function sessionListener (e) {
      session = e;
      console.log('got session', session);
      connected = true;
      console.log('on ready handler', onreadyHandler);
      if (onreadyHandler) {
        onreadyHandler();
      }
      session.addUpdateListener(function (isAlive) {
        console.log('session update', isAlive, session);
        connected = isAlive;
        if (onreadyHandler) {
        onreadyHandler();
        }
      });
      session.addMessageListener(chromecastNamespace, function (namespace, message) {
        console.log('got message!', namespace, message);
        message = JSON.parse(message);
        if (messageHandler) {
          messageHandler(message.type, message.data, message.sender);
        }
      });
    }

    function setUpChromeCast () {
      window.__onGCastApiAvailable = function (loaded, errorInfo) {
        if (loaded) {
          initializeCastApi();
        } else {
          console.log(errorInfo);
        }
      };
    }

    function initializeCastApi () {
      var sessionRequest = new chrome.cast.SessionRequest(appId);
      var apiConfig = new chrome.cast.ApiConfig(
                              sessionRequest,
                              sessionListener,
                              receiverListener
                              );

      chrome.cast.initialize(
        apiConfig,
        function() {
          console.log('init success!');
          castInitialized = true;
        },
        function() { console.log('init error!'); }
      );
    }

    function receiverListener (e) {
      if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        console.log('Found a receiver!!!');
      }
    }
  }

})();
