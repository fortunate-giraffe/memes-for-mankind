(function() {
  'use strict';

  angular
    .module('app.choosing')
    .controller('Choosing', Choosing);

    Choosing.$inject = [];

    function Choosing() {
      var vm = this;
      
      //example submision data
      vm.submissions = [ 
        {"player": 1, "img": "http://www.dumpaday.com/wp-content/uploads/2013/09/memes-23.jpg"}, 
        {"player": 2, "img": "http://images.sugarscape.com/userfiles/image/AAAAAAAAAAAAAAAFEB2014/Josh/BBT-meme-2.jpg"}, 
        {"player": 3, "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvIm9MtEkKVTNKMkaPbzhuooSbC5AD8f_2Rqm8ioLOrhzQ9on"}, 
        {"player": 4, "img": "http://jokideo.com/wp-content/uploads/meme/2014/07/Yeah-dating-is-cool---funny-meme.jpg"}
      ];
    };

})();