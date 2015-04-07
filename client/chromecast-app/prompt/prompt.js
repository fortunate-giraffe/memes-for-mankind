(function() {
  'use strict';

  angular
    .module('app.prompt')
    .controller('Prompt', Prompt);

    Prompt.$inject = [];

    function Prompt() {
      var vm = this;

      vm.prompt = "This will be the prompt."
    }

})();