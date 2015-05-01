(function() {
  'use strict';

  angular
      .module('app.start')
      .controller('Start', Start);

  Start.$inject = ['playerMessenger', 'playerUser', '$state', 'chromeDetect', 'events'];

  function Start(playerMessenger, playerUser, $state, chromeDetect, events) {
    /*jshint validthis: true */
    var vm = this;

    vm.title = 'Great fun is about to ensue.';
    vm.imgsrc = 'content/cast_disconnected_black-512.png';
    vm.connectionStatus = playerMessenger.getConnectionStatus();
    vm.startGame = startGame;
    vm.userName = '';
    vm.nameSubmitted = false;
    vm.playerStarted = false;
    vm.setUser = setUser;
    vm.ccAvailable = true;
    vm.hasExtension = true; // these start as true and only change when the cast icon is clicked
    vm.onChrome = true; // these start as true and only change when the cast icon is clicked
    vm.onMobile = false; // starts as false and we'll only update once the cast icon is clicked

    changeStateListener();

    playerMessenger.on('chromecastConnection', function(){
      vm.connectionStatus = playerMessenger.getConnectionStatus();
      console.log('connection status updated', vm.connectionStatus);
    });

    // this event is triggered when cast-sender.js determines no CC's are available on the wifi
    events.on('ReceiverUnavailable', function() {
      console.log('receiverunavailable triggered!');
      vm.ccAvailable = false;
    });

    vm.connect = function () {
      // checking for the extension and chrome
      vm.onChrome = chromeDetect.checkBrowser();
      vm.hasExtension = chromeDetect.checkExtension();
      vm.onMobile = chromeDetect.checkMobile();
      if (vm.hasExtension && vm.onChrome && !vm.onMobile) {
        playerMessenger.connect();
      }
    };

    // user setting their name and revealing the start game button
    function setUser() { // event
      // initializing the messaging system once we know a user's name
      if( vm.userName ){
        playerMessenger.init(vm.userName);
        vm.nameSubmitted = !vm.nameSubmitted;
        playerMessenger.join();
      }
    }

    // player clicking the start button indicating they're ready
    function startGame() {
      playerMessenger.ready();
      // toastr.info(playerUser.getUser() + ' wants to play!');
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
