'use strict';
var WebSocketServer = require('ws').Server;
var wsServer = new WebSocketServer({ port: process.env.devSocketPort });

// Utility function to broadcast a message to all connected clients,
// totally indiscriminately
// wsServer.broadcast = function (data) {
//   this.clients.forEach(function (client) {
//     client.send(data);  //send to all clients, including initial sender
//   });
// };

// index of socket connections by user
var connections = {};

wsServer.on('connection', function (ws) {

  ws.on('message', function (messageStr) {
    console.log('new message' + messageStr);

    var msg = JSON.parse(messageStr);

    // the first message a new connection sends must be a 'signin' message
    // so we can associate a use with a socket client
    if (msg.type === 'signin') {
      connections[msg.sender] = ws;

    // if broadcast, cycle through registered connections and send them a message
    } else if (msg.recipient === 'broadcast') {

      for (var user in connections) {
        if (user !== msg.sender) {
          connections[user].send(messageStr);
        }
      }

    } else {

      var client = connections[msg.recipient];
      if (client) { client.send(messageStr); }

    }
  });
});