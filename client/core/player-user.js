(function (){
'use strict';
angular
  .module('app.player-user', [])
  .factory('playerUser', playerUser);

  playerUser.$inject = [];

  function playerUser() {

    // factory for storing some variable about our user that we need throughout the game flow
    // user's self defined name
    var user = '';
    // receipient of messages sent from the user, almost exclusively will be the chromecast device
    var gameRecipient = 'ChromeCast';
    // either player || judge
    var role = '';
    // judge's choice or players choice when picking a template, likely a URL
    var memeChoice = '';
    // list of memes for the judge to review
    var judgeMemeList = [];
    // the winning meme for the round
    var winningMeme = '';

    return {
      // getters
      getUser: getUser,
      getRole: getRole,
      getGameRecipient: getGameRecipient,
      getMemeChoice: getMemeChoice,
      getJudgeMemeList : getJudgeMemeList,
      // setters
      setUser: setUser,
      setRole: setRole,
      setGameRecipient: setGameRecipient,
      setMemeChoice: setMemeChoice,
      setJudgeMemeList : setJudgeMemeList,
      getWinner: getWinner,
      setWinner: setWinner
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

    function getJudgeMemeList () {
      return judgeMemeList;
    }

    function setUser (string) {
      user = string;
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

    function setJudgeMemeList (array) {
      judgeMemeList = array;
    }

    function getWinner () {
      return winningMeme;
    }

    function setWinner (meme) {
      winningMeme = meme;
    }

  }
})();