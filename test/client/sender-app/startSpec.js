'use strict';

describe('Start Controller', function() {
  var scope, ctrl, playerMessenger, playerUser; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _playerMessenger_, _playerUser_) {
      playerMessenger = _playerMessenger_;
      playerUser = _playerUser_;
      scope = $rootScope.$new();
      ctrl = $controller('Start', {$scope: scope});
    });
  });

  // tests here
  it('should start with no player name', function() {
    expect(ctrl.nameSubmitted).toBe(false);
  });

  it('should start with player started = false', function() {
    expect(ctrl.playerStarted).toBe(false);
  });

  it('should start with a blank username', function() {
    expect(ctrl.userName).toEqual('');
  });

  it('should have startGame function', function() {
    expect(typeof ctrl.startGame).toEqual('function');
  });

  it('should have setUser function', function() {
    expect(typeof ctrl.setUser).toEqual('function');
  });

  xdescribe('the setUser function', function() {
    it('setUser should change the nameSubmitted value to true', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      expect(ctrl.nameSubmitted).toBe(true);
    });

    it('setUser should change the user value in the playerUser factory', function() {
      ctrl.userName = 'Michael Bolton';
      playerUser.setUser(ctrl.userName);
      ctrl.setUser();
      expect(playerUser.getUser()).toEqual('Michael Bolton');
    });
  });

  xdescribe('the startGame function', function() {
    it('startGame should change the playerStarted value to true', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      ctrl.startGame();
      expect(ctrl.playerStarted).toBe(true);
    });
  });

});