(function() {
  'use strict';

  angular
    .module('app.waiting')
    .controller('Waiting', Waiting);

    Waiting.$inject = ['game', '$state'];

    function Waiting(game, $state) {
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

    vm.currentDisplay = vm.mainContent['waitingForPlayers'];

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