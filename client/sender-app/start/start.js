(function() {
  'use strict';

  angular
      .module('app.start')
      .controller('Start', Start);

  Start.$inject = ['playerMessenger', 'playerUser', '$state'];

  function Start(playerMessenger, playerUser, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.test = 'Start';
    vm.startGame = startGame;
    vm.userName = '';
    vm.btnShow = false;
    vm.setUser = setUser;

    changeStateListener();

    // user setting their name and revealing the start game button
    function setUser(event) {
      // set username in playerUser factory
      playerUser.setUser(vm.userName);
      // unhide btn
      vm.btnShow = true;
    }

    // player clicking the start button indicating they're ready
    function startGame() {
      playerMessenger.ready();
      toastr.info(playerUser.getUser() + ' wants to play!');
    }

    // listener for game to indicate what role they should have
    function changeStateListener() {
      // on start msg from Chromecast, decide where to go
      playerMessenger.on('start', function(data) {
        // if role is judge, go to prompt view
        if (data.role === 'judge') {
          playerUser.setRole('judge');
          $state.go('home.prompt');
        } else {
          // if role is player go to waiting view
          playerUser.setRole('player');
          $state.go('home.waiting');
        }
      });
    }
  }
})();
