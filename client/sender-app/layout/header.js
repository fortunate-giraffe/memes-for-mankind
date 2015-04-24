(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Header', Header);

  Header.$inject = ['playerMessenger', 'chromeDetect'];

  function Header(playerMessenger, chromeDetect) {
    /*jshint validthis: true */
    var vm = this;
    vm.castButtonState = playerMessenger.getConnectionStatus();
    vm.hasExtension = true; // these start as true and only change when the cast icon is clicked
    vm.onChrome = true; // these start as true and only change when the cast icon is clicked

    vm.connect = function () {
      // checking for the extension and chrome
      vm.onChrome = chromeDetect.checkBrowser();
      vm.hasExtension = chromeDetect.checkExtension();
      if (vm.hasExtension && vm.onChrome) {
        playerMessenger.connect();
      }
    };

    playerMessenger.on('chromecastConnection', function(){
      vm.castButtonState = playerMessenger.getConnectionStatus();
    });
  }
})();
