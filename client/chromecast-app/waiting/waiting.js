(function() {
  'use strict';

  angular
    .module('app.waiting')
    .controller('Waiting', Waiting);

    Waiting.$inject = ['gameMessenger', 'game', '$state'];

    function Waiting(gameMessenger, game, $state) {
      var vm = this;

      vm.mainContent = {
        waitingForPlayers: {
          text: "Where are your friends? You've gotta have at least 3!",
          image: "http://cdn.meme.am/instances/500x/60894524.jpg" 
        },
        readyToPlay: {
          text: "Ready to play?",
          image: ""
        },
        waitingForPrompt:  {
          text: "Judge: Choose the prompt!",
          image: ""
        }
      }

    var status = game.started() ? 'waitingForPrompt' : 'waitingForPlayers';
    vm.currentDisplay = vm.mainContent[status]

    game.on('enoughPlayers', function() {
      vm.currentDisplay = vm.mainContent['readyToPlay'];
    });

    game.on('gameStart', function() {
      vm.currentDisplay = vm.mainContent['waitingForPrompt'];
    });

    game.on('promptSubmitted', function() {
      $state.go('home.creating');
    });

    }

})();