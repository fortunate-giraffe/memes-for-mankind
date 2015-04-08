// Handles communication between clients. Mocks out over 
// local socket server for now.
(function (){
angular.module('app.messaging', [])
  .factory('messenger', messenger);

function messenger () {

  var socket = new WebSocket('ws://127.0.0.1:3434');
  var ready = false;
  var sender;
  socket.onopen = function () {
    ready = true;
  };

  return {
    initAsUser: initAsUser, // TODO: deprecate once we have a user service
    send: send,
    broadcast: broadcast,
    onmessage: onmessage,
    onready: onready
  };

  function initAsUser (user) { 
    sender = user;
    send('signin');
  }
 
  function onready (readyHandler) {
    if (ready) {
      readyHandler();
    } else {
      socket.onopen = function() {
        ready = true;
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
    if (!type) throw new Error('all messages must have a type');
    if (!sender) throw new Error('must instantiate a sender before you can send a message');
    if (!ready) throw new Error('must wait until socket is open before you can send a message');

    socket.send(JSON.stringify({
      recipient: recipient,
      data: data,
      type: type,
      sender: sender
    }));
  }

  // if recipient is 'broadcast', the message gets sent to everyone except the sender
  function broadcast (data, type) {
    send(type, data, 'broadcast');
  }

}
})();
