(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Header', Header);

  Header.$inject = ['playerMessenger'];

  function Header(playerMessenger) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'MemesForMankind';
    vm.castButtonState = playerMessenger.getConnectionStatus();

    vm.connect = function () {
      playerMessenger.connect();
    };

    playerMessenger.on('chromecastConnection', function(){
      vm.castButtonState = playerMessenger.getConnectionStatus();
    });
  }
})();
