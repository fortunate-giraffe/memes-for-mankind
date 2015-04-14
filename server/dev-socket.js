'use strict';
var WebSocketServer = require('ws').Server;
var wsServer = new WebSocketServer({ port: process.env.devSocketPort });

// index of socket connections by user
var connections = {};

wsServer.on('connection', function (ws) {

  ws.on('message', function (messageStr) {
    console.log('new message' + messageStr);

    var msg = JSON.parse(messageStr);

    connections[msg.sender] = ws;  // update index in case socket connection has changed

    // if broadcast, cycle through registered connections and send them a message
    if (msg.recipient === 'broadcast') {

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