(function() {
  'use strict';

  angular
      .module('app.creating')
      .controller('Creating', Creating);

  Creating.$inject = [];

  function Creating() {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Creating';
    vm.meme = 'http://cdn.meme.am/instances/250x250/60953094.jpg';
    vm.submitCreation = submitCreation;

    // example function to submit created meme
    function submitCreation() {
      toastr.info('sending meme (not really)');
    }
  }
})();
