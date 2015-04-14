(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Footer', Footer);

  Footer.$inject = [];

  function Footer() {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Footer';
  }
})();
