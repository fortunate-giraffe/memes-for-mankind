(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Footer', Footer);

  Footer.$inject = ['playerMessenger'];

  function Footer(playerMessenger) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Footer';
  }
})();
