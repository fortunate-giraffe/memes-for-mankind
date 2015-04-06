(function() {
  'use strict';

  angular
      .module('app.start')
      .controller('Start', Start);

  Start.$inject = [];

  function Start() {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Start';
    vm.startGame = startGame;

    function startGame() {
      toastr.info('wants to play!');
    };
  }
})();
