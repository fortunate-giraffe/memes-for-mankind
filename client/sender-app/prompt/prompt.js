(function() {
  'use strict';

  angular
      .module('app.prompt')
      .controller('Prompt', Prompt);

  Prompt.$inject = [];

  function Prompt() {
    /*jshint validthis: true */
    var vm = this;
    vm.prompt = '';
    vm.submitPrompt = submitPrompt;

    // example to handle prompt submission
    function submitPrompt() {
      toastr.info('submitted this prompt: ' + vm.prompt);
    }
  }
})();
