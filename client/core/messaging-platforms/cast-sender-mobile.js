(function() {
  'use strict';

  angular.module('app.cast-sender', [])
    .factory('castSenderMessenger', castSenderMessenger);
  // question: does ConnectSDK support namespaces for Cast?
  // can't find anything in the docs to indicate it does (or needs it...)
  // might just default one.
  castSenderMessenger.$inject = ['chromecastNamespace', 'appId'];

  function castSenderMessenger (chromecastNamespace, appId) {
    var gameRecipient = 'ChromeCast';
    var device;
    var username;
    var session;
    var connected;
    // var castInitialized;
    var messageHandler;
    var onreadyHandler;

    setUpConnectSDK();

    return {
      init: init,  //done
      connect: connect, //done
      connectionStatus: connectionStatus,
      onready: onready,  // for Cast, it's when a connection is established
      onmessage: onmessage,
      send: send,
      broadcast: function () {}, // players don't broadcast,
    };

    function setUpConnectSDK () {
      // start looking for devices
      console.log('initing connect SDK!');
      var discoveryOptions = {
        capabilityFilters: [
          new ConnectSDK.CapabilityFilter(['WebAppLauncher.Launch'])
        ]
      };
      ConnectSDK.discoveryManager.startDiscovery(discoveryOptions);
    }

    function connect () {

      // select device and then connect to it
      ConnectSDK.discoveryManager
        .pickDevice()
        .success(function (selectedDevice) {
          device = selectedDevice;
          connectToDevice(device);
        })
        .error(function (err) {
          if (!err) {
            console.log('cancelled picker');
          } else {
            console.log('error picking device');
          }
        });

      // connect, and when device is ready, connect to or launch our app
      function connectToDevice (device) {
        console.log('got device', device.getModelName());
        console.log('is device ready? ', device.isReady());
        if (device.isReady()) {
          deviceReady(device);
        } else {
          device.on('ready', deviceReady);
          device.connect();
        }
      }

      // connect to or launch our app
      function deviceReady () {
        console.log('device is ready!');
        device.off('ready'); // remove ready listeners

        var launcher = device.getWebAppLauncher();

        launcher.joinWebApp(appId)
          .success(function (webAppSession) {
            console.log('joined session!', webAppSession);
            setUpWebAppSession(webAppSession);
          })
          .error(function () {
            console.log('error joining app! It probably is not running');
            launcher.launchWebApp(appId)
              .success(setUpWebAppSession)
              .error(function () {
                console.log('error launching session');
              });
          });
      }

      function setUpWebAppSession (webAppSession) {
        session = webAppSession.acquire();

        // Add listeners
        session.on('message', function (message) {
          console.log('received message!', message);
          if (typeof message === 'string') {
            message = JSON.parse(message);
          }
          if (messageHandler) {
            messageHandler(message.type, message.data, message.sender);
          }
        });

        session.on('disconnect', function () { console.log('disconnecting!'); });

        // Connect to the web app
        // ANDY: connect seems to kill the existing session... Do we need it??
        session.connect()
          .success(function (info) {
            connected = true;
            console.log('session connected!', info);
            if (onreadyHandler) {
              onreadyHandler();
            }
          })
          .error(function (err) {
            console.log('error connecting session :( ', err);
          });
      }
    }

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

    function send (type, data, recipient) {
      recipient = recipient || gameRecipient; // player almost(?) always send messages to the game
      var message = JSON.stringify({
        type: type,
        data: data,
        recipient: recipient,
        sender: username
      });
      console.log('sending message!', message);
      session.sendText(message);
    }

  }
})();
