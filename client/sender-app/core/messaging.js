(function() {
  'use strict';
  // This module determines which messaging platform the Cast Sender uses.
  angular.module('app.messaging', [])
    .factory('messenger', senderMessenger);

  senderMessenger.$inject = ['$injector', 'socketDev'];

  function senderMessenger ($injector, socketDev) {
    var module = socketDev ? 'socketMessenger' : 'castSenderMessenger';
    return $injector.get(module);
  }

})();