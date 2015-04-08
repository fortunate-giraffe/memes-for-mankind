(function() {
  'use strict';

  angular
      .module('app.choosing')
      .controller('Choosing', Choosing);

  Choosing.$inject = ['dataService', 'playerUser', '$state'];

  function Choosing(dataService, playerUser, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Choosing!';
    vm.role = playerUser.getRole();
    vm.chosenMeme = null;
    vm.clickHandler = clickHandler;
    vm.moveOn = moveOn;

    // calling dataservice with getmemes to get the memes we want to show
    dataService.getMemes().success(function(data){
      vm.memes = chunkData(data.result, 2);
    });

    // function to break data into rows of N cols for display
    function chunkData(arr, size) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    }

    // once a template is chosen, move to the next state (either creating or waiting)
    function moveOn() {
      if (playerUser.getRole() === 'judge') {
        $state.go('home.waiting');
      } else {
        $state.go('home.creating');
      }
    }

    // handle clicking on any of the memes
    function clickHandler(e) {
      // change any existing 'selected' elements to not be 'selected'
      $('.selected').toggleClass('selected');
      // change the class to be 'selected'
      $(e.target).addClass('selected');
      vm.chosenMeme = JSON.parse(e.target.attributes['ng-bind'].nodeValue);
      playerUser.setMemeChoice(vm.chosenMeme);
      toastr.info('you picked url: ' + vm.chosenMeme.generatorID);
    }

  }
})();