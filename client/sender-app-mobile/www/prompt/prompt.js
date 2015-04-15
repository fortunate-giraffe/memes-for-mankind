(function() {
  'use strict';

  angular
      .module('app.prompt')
      .controller('Prompt', Prompt);

  Prompt.$inject = ['playerMessenger','$state'];

  function Prompt(playerMessenger, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.prompt = '';
    vm.submitPrompt = submitPrompt;

    // example to handle prompt submission
    function submitPrompt() {
      var prompt = {
        prompt: vm.prompt
      };
      playerMessenger.submit(prompt);
      $state.go('home.waiting');
      toastr.info('submitted this prompt: ' + vm.prompt);
    }
  }
})();
