(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

    Shell.$inject = [];

    function Shell() {
      var vm = this;
    }

    // setting toastr defaults across all views via the shell
    window.toastr.options.timeOut = 20000;
    window.toastr.options.positionClass = 'toast-bottom-right';

})();