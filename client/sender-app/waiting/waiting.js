(function() {
  'use strict';

  angular
      .module('app.waiting')
      .controller('Waiting', Waiting);

  Waiting.$inject = ['playerMessenger', 'playerUser', '$state'];

  function Waiting(playerMessenger, playerUser, $state) {
    toastr.info(playerUser.getUser());

    changeStateListener();

    // listener for msg to indicate what's next
    function changeStateListener() {
      // on promptSubmitted msg from Chromecast, everyone but the judge to choosing page
      playerMessenger.on('promptSubmitted', function() {
        if (playerUser.getRole() !== 'judge') {
          $state.go('home.choosing');
        }
      });

      // on startJudging msg from Chromecast, judge goes to the choosing page, everyone else stays
      playerMessenger.on('startJudging', function(message) {
        // if role is judge, go to prompt
        if (playerUser.getRole() === 'judge') {
          playerUser.setJudgeMemeList(message.memes);
          $state.go('home.choosing');
        }
      });

      // on done msg from Chromecast, go to start page
      playerMessenger.on('done', function(winningMeme) {
        playerUser.setWinner(winningMeme);
        $state.go('home.done');
      });
    }
  }
})();
