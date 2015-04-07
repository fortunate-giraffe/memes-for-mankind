(function() {
  'use strict';

  angular
    .module('app.winner')
    .controller('Winner', Winner);

    Winner.$inject = [];

    function Winner() {
      var vm = this;
      //example data
      vm.winner = {player: "player1", img: "http://www.dumpaday.com/wp-content/uploads/2013/09/memes-23.jpg"}
    }

})();