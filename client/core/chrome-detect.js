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
      // only actually check if they also don't have cordova and haven't loaded up the socket version
      browserIsChrome = (window.cordova || window.chrome || socketDev);
      return browserIsChrome;
    }

    function checkExtension () {
      // if the user doesn't have the chrome extension, tell them to get the cast extension
      // only actually check if they also don't have cordova and haven't loaded up the socket version
      // check browser first to avoid getting a null reference on cast.extensionId
      browserHasExtension = (window.cordova || window.chrome.cast.extensionId || socketDev);
      return browserHasExtension;
    }
  }

})();
