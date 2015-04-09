(function() {
  'use strict';

  angular
    .module('app.prompt')
    .controller('Prompt', Prompt);

    Prompt.$inject = ['game'];

    function Prompt(game) {
      var vm = this;

      vm.prompt = game.getPrompt();
    }

})();