(function() {
  'use strict';

  angular.module('app.cast-receiver', [])
    .factory('castReceiverMessenger', castReceiverMessenger);

  castReceiverMessenger.$inject = ['chromecastNamespace'];

  function castReceiverMessenger (chromecastNamespace) {
    var senders = {}; // store senderIds with human readable names as keys
    var sender = 'ChromeCast';
    var ready = false;
    var readyHandler;

    setUpCC();

    return {
      init: function () {}, // nothing caller needs to init, everything taken care of above, when injected
      connect: function () {}, // We don't need this on the receiver client, but calling connect shouldn't result in an error
      connectionStatus: function () {}, // not implemented yet
      onmessage: setupMessageHandler,
      onready: setupReadyHandler,
      send: send,
      broadcast: broadcast,
    };

    function setUpCC () {
      cast.receiver.logger.setLevelValue(0);
      window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

      castReceiverManager.onReady = function() { // (event)
        ready = true;
        window.castReceiverManager.setApplicationState('Application status is ready...');
        if (readyHandler) {
          readyHandler(); // from onready
        }
      };

      castReceiverManager.onSenderConnected = function(event) {
        toastr.info('Received Sender Connected event: ' + event.data);
      };

      castReceiverManager.onSenderDisconnected = function(event) {
        toastr.info('Received Sender Disconnected event: ' + event.data);
        if (window.castReceiverManager.getSenders().length === 0 &&
          event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        window.close();
        }
      };

    }

    function setupMessageHandler (messageHandler) {
      // create a CastMessageBus to handle messages for a custom namespace
      window.messageBus = window.castReceiverManager.getCastMessageBus(chromecastNamespace);
      window.messageBus.onMessage = function(event) {
        toastr.info('Message Received!' + event.data);
        var data = JSON.parse(event.data);
        // saving a mapping of usernames to senderId's to allow message passing
        senders[data.sender] = event.senderId;
        messageHandler(data.type, data.data, data.sender);
      };

      // initialize the CastReceiverManager with an application status message
      window.castReceiverManager.start({statusText: 'Application is starting'});
    }

    function send (type, data, recipient) {
      if (!type) {
        throw new Error('all messages must have a type');
      }
      if (!recipient) {
        throw new Error('message must have a receipient before you can send a message');
      }

      window.messageBus.send(senders[recipient], JSON.stringify({
        recipient: recipient,
        data: data,
        type: type,
        sender: sender
      }));
    }

    function broadcast (type, data) {
      window.messageBus
        .broadcast(JSON.stringify({
          type: type,
          data: data,
          sender: sender
        }));
    }

    function setupReadyHandler (handler) {
      if (ready) {
        handler();
      } else {
        readyHandler = handler;
      }
    }
  }
})();
