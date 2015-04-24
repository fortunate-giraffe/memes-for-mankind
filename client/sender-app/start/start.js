(function() {
  'use strict';

  angular
      .module('app.start')
      .controller('Start', Start);

  Start.$inject = ['playerMessenger', 'playerUser', '$state', 'chromeDetect'];

  function Start(playerMessenger, playerUser, $state, chromeDetect) {
    /*jshint validthis: true */
    var vm = this;

    vm.title = 'Great fun is about to ensue.';
    vm.connectionStatus = playerMessenger.getConnectionStatus();
    vm.startGame = startGame;
    vm.userName = '';
    vm.nameSubmitted = false;
    vm.playerStarted = false;
    vm.setUser = setUser;
    vm.hasExtension = true; // these start as true and only change when the cast icon is clicked
    vm.onChrome = true; // these start as true and only change when the cast icon is clicked

    changeStateListener();

    playerMessenger.on('chromecastConnection', function(){
      vm.connectionStatus = playerMessenger.getConnectionStatus();
      console.log('connection status updated', vm.connectionStatus);
    });

    vm.connect = function () {
      // checking for the extension and chrome
      vm.onChrome = chromeDetect.checkBrowser();
      vm.hasExtension = chromeDetect.checkExtension();
      if (vm.hasExtension && vm.onChrome) {
        playerMessenger.connect();
      }
    };

    vm.keyPress = function(e){
      if( e.which === 13 ){
        setUser();
        e.preventDefault();
      }
    };

    // user setting their name and revealing the start game button
    function setUser() { // event
      // initializing the messaging system once we know a user's name
      playerMessenger.init(vm.userName);
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
