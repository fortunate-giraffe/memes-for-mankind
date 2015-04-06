(function() {
  'use strict';

  angular
      .module('app.waiting')
      .controller('Waiting', Waiting);

  Waiting.$inject = ['simpleObj'];

  function Waiting(simpleObj) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Waiting';
    vm.simple = simpleObj;
    toastr.info(simpleObj.value);
  }
})();
