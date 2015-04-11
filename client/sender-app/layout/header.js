(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Header', Header);

  Header.$inject = ['playerMessenger', '$rootScope'];

  function Header(playerMessenger, $rootScope) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'MemesForMankind';
    vm.castButtonState = playerMessenger.getConnectionStatus();

    vm.connect = function () {
      playerMessenger.connect();
    };

    playerMessenger.on('chromecastConnection', function(){
      $rootScope.$apply(function() {
        vm.castButtonState = playerMessenger.getConnectionStatus();
      });
    });
  }
})();
