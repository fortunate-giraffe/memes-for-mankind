(function(){
  'use strict';
  angular.module('app.game-messenger', [])
    .factory('gameMessenger', gameMessenger);

    gameMessenger.$inject = ['messenger', 'socketDev', 'chromecastNamespace'];

    function gameMessenger (messenger, socketDev, chromecastNamespace) {
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

      // object to store senderIds with human readable names as keys
      var senders = {};

      if (!socketDev) {
        console.log('not local dev!');
        setUpChromeCast(); // set up chromecast messaging
      } else {
        init(); // set up sockets
      }

      return {
        start: start,
        promptSubmitted: promptSubmitted,
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
        // if chromecast send using ccSend
        if (!socketDev) {
          ccSend(type, data, recipient);
        } else { // if sockets, check all set
          if (!allSet) {
            queuedMessages.push([type, data, recipient]);
          } else {
            messenger.send(type, data, recipient);
          }
        }
      }

      function start (recipient, role) {
        send('gameStarted', role, recipient);
      }

      function promptSubmitted (recipient, prompt) {
        send('promptSubmitted', prompt, recipient);
      }

      // Question: do we pass the memes, or just trigger the judge
      // to retrieve the memes from the server?
      function startJudging (judge, memes) {
        send('startJudging', memes, judge);
      }

      function done () {
        if (!socketDev) {
          window.messageBus
            .broadcast(JSON.stringify({
              type:'done',
              data:'done',
              sender: 'ChromeCast'
            }));
        } else {
          messenger.broadcast('done');
        }
      }

      function registerEventHandler (event, handler) {
        eventHandlers[event] = handler;
      }

      function ccSend (type, data, recipient) {
        if (!type) throw new Error('all messages must have a type');
        if (!recipient) throw new Error('message must have a receipient before you can send a message');
        try {
          window.messageBus.send(senders[recipient], JSON.stringify({
          recipient: recipient,
          data: data,
          type: type,
          sender: 'ChromeCast'
        }));
        } catch(e) {
          toastr.info('Error sending! ' + e);
        }
      }

      function setUpChromeCast() {
        console.log('setting up chromecast!');
        cast.receiver.logger.setLevelValue(0);
        window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

        // handler for the 'ready' event
        castReceiverManager.onReady = function(event) {
          //toastr.info('Received Ready event: ' + JSON.stringify(event.data));
          window.castReceiverManager.setApplicationState('Application status is ready...');
        };

        // handler for 'senderconnected' event
        castReceiverManager.onSenderConnected = function(event) {
          //toastr.info('Received Sender Connected event: ' + event.data);
          //toastr.info(window.castReceiverManager.getSender(event.data).userAgent);
        };

        // handler for 'senderdisconnected' event
        castReceiverManager.onSenderDisconnected = function(event) {
          //toastr.info('Received Sender Disconnected event: ' + event.data);
          if (window.castReceiverManager.getSenders().length == 0 &&
            event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
          window.close();
          }
        };
        // create a CastMessageBus to handle messages for a custom namespace
        // toastr.info('cast receiver manager: ' + window.castReceiverManager);
        window.messageBus = window.castReceiverManager.getCastMessageBus(chromecastNamespace);
        // initialize the CastReceiverManager with an application status message
        window.castReceiverManager.start({statusText: 'Application is starting'});

        // function ccOnMessage (messsageHandler) {
        //   window.messageBus.onMessage = function(event) {
        //     var data = JSON.parse(event.data);
        //     messsageHandler(data.type, data.data, data.sender);
        //   };
        // }
        // toastr.info('messageBus: ' + window.messageBus);
        // toastr.info('setting up on message handler');

        window.messageBus.onMessage = function(event) {
          //toastr.info('Message Received!');
          //toastr.info(event.data);
          var data = JSON.parse(event.data);
          // saving a mapping of usernames to senderId's to allow message passing
          senders[data.sender] = event.senderId;
          var handler = eventHandlers[data.type];
          handler && handler(data.data, data.sender);
          // ccSend(data.type, data.data, data.sender);
        };

      }
    }
})();