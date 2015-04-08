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

    // establishing listener
    changeStateListener();

    // example to handle prompt submission
    function submitPrompt() {
      var prompt = {
        prompt: vm.prompt
      };
      playerMessenger.submit(prompt);
      toastr.info('submitted this prompt: ' + vm.prompt);
    }

    function changeStateListener(){
      playerMessenger.on('promptSubmitted', function(){
        $state.go('home.waiting');
      });
    }
  }
})();
