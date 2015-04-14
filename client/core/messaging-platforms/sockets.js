(function() {
  'use strict';

  angular.module('app.sockets', [])
    .factory('socketMessenger', socketMessenger);

  socketMessenger.$inject = ['devSocketHost'];

  function socketMessenger (devSocketHost) {
    var socket = new WebSocket(devSocketHost); //only use sockets for local dev
    var ready = false;
    var sender;
    var queuedMessages = [];

    var readyTasks = function () {
      ready = true;
      queuedMessages.forEach(function (message) {
        send.apply(undefined, message);
      });
    };
    socket.onopen = readyTasks;

    return {
      init: init,
      connect: function () {}, // We don't need this on sockets, but calling connect shouldn't result in an error
      connectionStatus: connectionStatus,
      send: send,
      broadcast: broadcast,
      onmessage: onmessage,
      onready: onready
    };

    function init (name) {
      sender = name;
      send('signin');
    }

    function connectionStatus () {
      return ready;
    }

    function onready (readyHandler) {
      if (ready) {
        readyHandler();
      } else {
        socket.onopen = function() {
          readyTasks();
          readyHandler();
        };
      }
    }

    function onmessage (messageHandler) {
      socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        messageHandler(data.type, data.data, data.sender);
      };
    }

    function send (type, data, recipient) {
      if (!type) {
        throw new Error('all messages must have a type');
      }
      if (!sender) {
        throw new Error('must instantiate a sender before you can send a message');
      }

      if (!ready) {
        queuedMessages.push([type, data, recipient]);
      } else {
        socket.send(JSON.stringify({
          recipient: recipient,
          data: data,
          type: type,
          sender: sender
        }));
      }
    }

    // if socket server sees recipient is 'broadcast', it sends
    // the message to everyone except the sender.
    function broadcast (type, data) {
      send(type, data, 'broadcast');
    }
  }

})();
