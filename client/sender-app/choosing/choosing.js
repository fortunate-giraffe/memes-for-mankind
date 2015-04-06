(function() {
  'use strict';

  angular
      .module('app.choosing')
      .controller('Choosing', Choosing);

  Choosing.$inject = [];

  function Choosing() {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Choosing!';

    // test data
    var testData = [
      'http://cdn.meme.am/instances/250x250/60952437.jpg',
      'http://cdn.meme.am/instances/250x250/60963792.jpg',
      'http://cdn.meme.am/instances/250x250/60958820.jpg',
      'http://cdn.meme.am/instances/250x250/60958030.jpg',
      'http://cdn.meme.am/instances/250x250/60953094.jpg',
      'http://cdn.meme.am/instances/250x250/60950193.jpg',
      'http://cdn.meme.am/instances/250x250/60946816.jpg',
      'http://cdn.meme.am/instances/250x250/60965184.jpg',
      'http://cdn.meme.am/instances/250x250/60956931.jpg'
      ];

    vm.test = chunkData(testData, 2);
    vm.chosenMeme = null;
    vm.clickHandler = clickHandler;

    // function to break data into rows of two for display in two columns
    function chunkData(arr, size) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    }

    // handle clicking on any of the memes
    function clickHandler(e) {
      vm.chosenMeme = e.currentTarget.currentSrc;
      toastr.info('you picked url: ' + vm.chosenMeme);
    }

  }
})();