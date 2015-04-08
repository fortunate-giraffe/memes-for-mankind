(function (){
'use strict';
angular
  .module('app.player-user', ['app.player-messenger'])
  .factory('playerUser', function (playerMessenger) {
    
    // factory for storing some variable about our user that we need throughout the game flow
    // user's self defined name
    var user = ''; 
    // receipient of messages sent from the user, almost exclusively will be the chromecast device
    var gameRecipient = 'ChromeCast';
    // either player || judge
    var role = '';
    // judge's choice or players choice when picking a template, likely a URL
    var memeChoice = '';

    return {
      // getters
      getUser: getUser,
      getRole: getRole,
      getGameRecipient: getGameRecipient,
      getMemeChoice: getMemeChoice,
      // setters
      setUser: setUser,
      setRole: setRole,
      setGameRecipient: setGameRecipient,
      setMemeChoice: setMemeChoice
    };

    function getUser () {
      return user;
    }

    function getRole () {
      return role;
    }

    function getGameRecipient () {
      return gameRecipient;
    }

    function getMemeChoice () {
      return memeChoice;
    }

    function setUser (string) {
      user = string;
      // initializing the messaging system once we know a user's name
      console.log('calling setUser');
      playerMessenger.init(string);
    }

    function setRole (string) {
      role = string;
    }

    function setGameRecipient (string) {
      gameRecipient = string;
    }

    function setMemeChoice (url) {
      memeChoice = url;
    }

  });
})();