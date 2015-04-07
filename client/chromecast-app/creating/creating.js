(function() {
  'use strict';

  angular
    .module('app.creating')
    .controller('Creating', Creating);

    Creating.$inject = [];

    function Creating() {
      var vm = this;
      
      //example data
      vm.players = ["Rich", "Roger", "Andy", "Rebecca"];
    }

})();