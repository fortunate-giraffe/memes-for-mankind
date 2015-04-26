(function() {
  'use strict';

  angular
      .module('app.prompt')
      .controller('Prompt', Prompt);

  Prompt.$inject = ['playerMessenger', 'dataService', '$state'];

  function Prompt(playerMessenger, dataService, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.headlines; // jshint ignore:line
    vm.whiteCards; // jshint ignore:line
    vm.showHeadlines = false;
    vm.showCards = false;
    vm.prompt = '';
    vm.submitPrompt = submitPrompt;

    dataService.getHeadlinePrompts().then(function(data) {
      vm.headlines = data;
    });

    dataService.getWhiteCardPrompts().then(function(data) {
      vm.whiteCards = data.result;
    });

    // example to handle prompt submission
    function submitPrompt() {
      if(vm.prompt) {
        var prompt = {
          prompt: vm.prompt
        };
        playerMessenger.submit(prompt);
        $state.go('home.waiting');
        toastr.info('submitted this prompt: ' + vm.prompt);
      }
    }

  }
})();
