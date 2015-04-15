(function() {
  'use strict';

  angular
      .module('app.start')
      .controller('Start', Start);

  Start.$inject = ['playerMessenger', 'playerUser', '$state'];

  function Start(playerMessenger, playerUser, $state) {
    /*jshint validthis: true */
    var vm = this;

    vm.title = 'Great fun is about to ensue.';
    vm.connectionStatus = playerMessenger.getConnectionStatus();
    vm.startGame = startGame;
    vm.userName = '';
    vm.nameSubmitted = false;
    vm.playerStarted = false;
    vm.setUser = setUser;

    changeStateListener();

    playerMessenger.on('chromecastConnection', function(){
      vm.connectionStatus = playerMessenger.getConnectionStatus();
      console.log('connection status updated', vm.connectionStatus);
    });

    vm.connect = function () {
      playerMessenger.connect();
    };

    // user setting their name and revealing the start game button
    function setUser() { // event
      // set username in playerUser factory
      playerUser.setUser(vm.userName);
      vm.nameSubmitted = !vm.nameSubmitted;
      playerMessenger.join();
    }

    // player clicking the start button indicating they're ready
    function startGame() {
      playerMessenger.ready();
      toastr.info(playerUser.getUser() + ' wants to play!');
      vm.playerStarted = !vm.playerStarted;
    }

    // listener for game to indicate what role they should have
    function changeStateListener() {
      // on start msg from Chromecast, decide where to go
      playerMessenger.on('gameStarted', function(data) {
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
