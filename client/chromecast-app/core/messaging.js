(function() {
  'use strict';
  // This module determines which messaging platform the Cast Receiver uses.
  angular.module('app.messaging', [])
    .factory('messenger', receiverMessenger);

  receiverMessenger.$inject = ['$injector', 'socketDev'];

  function receiverMessenger ($injector, socketDev) {
    var module = socketDev ? 'socketMessenger' : 'castReceiverMessenger';
    return $injector.get(module);
  }

})();