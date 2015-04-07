(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

    Sidebar.$inject = [];

    function Sidebar() {
      var vm = this;
      //vm.players will call function to get players
      vm.players = ['Rich', 'Roger', 'Andy', 'Rebecca'];
    }
  
})();