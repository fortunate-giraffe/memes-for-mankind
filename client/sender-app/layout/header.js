(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('Header', Header);

  Header.$inject = [];

  function Header() {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'MemesForMankind';
  }
})();
