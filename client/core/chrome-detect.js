(function() {
  'use strict';

  angular.module('app.chrome-detect', [])
    .factory('chromeDetect', chromeDetect);

  chromeDetect.$inject = ['events', 'socketDev'];

  function chromeDetect (events, socketDev) {
    var browserIsChrome;
    var browserHasExtension;

    return {
      checkBrowser: checkBrowser,
      checkExtension: checkExtension
    };

    function checkBrowser () {
      // if the user doesn't have chrome at all, tell them to get Chrome and the cast extension
      browserIsChrome = (!window.chrome) ? false : true;
      return browserIsChrome;
    }

    function checkExtension () {
      browserHasExtension = (!window.chrome.cast.extensionId) ? false : true;
      return browserHasExtension;
    }
  }

})();
