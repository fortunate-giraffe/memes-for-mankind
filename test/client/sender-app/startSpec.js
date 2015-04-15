'use strict';

describe('Start Controller', function() {
  var scope, state, ctrl, playerMessenger, playerUser, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, $httpBackend, _playerMessenger_, _playerUser_, _events_) {
      playerMessenger = _playerMessenger_;
      playerUser = _playerUser_;
      events = _events_;
      // spy on player messenger's methods that are used
      spyOn(playerMessenger, 'join').and.callFake(function() {
            return 'joined!';
          });
      spyOn(playerMessenger, 'ready').and.callFake(function() {
            return 'ready!';
          });
      state = $state;
      spyOn(state, 'go').and.callFake(function() {
            return 'went!';
          });

      $httpBackend.whenGET(/./).respond(200, { Response: 'a response' });

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

  describe('the setUser function', function() {
    it('setUser should change the nameSubmitted value to true', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      expect(ctrl.nameSubmitted).toBe(true);
    });

    it('setUser should call the playerMessenger.join method', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      expect(playerMessenger.join).toHaveBeenCalled();
    });

    it('setUser should change the user value in the playerUser factory', function() {
      ctrl.userName = 'Michael Bolton';
      playerUser.setUser(ctrl.userName);
      ctrl.setUser();
      expect(playerUser.getUser()).toEqual('Michael Bolton');
    });
  });

  describe('the startGame function', function() {
    it('startGame should change the playerStarted value to true', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      ctrl.startGame();
      expect(ctrl.playerStarted).toBe(true);
    });

    it('startGame should call the playerMessenger.ready method', function() {
      ctrl.userName = 'Bobby Darrin';
      ctrl.setUser();
      ctrl.startGame();
      expect(playerMessenger.ready).toHaveBeenCalled();
    });
  });

  describe('the state listeners', function() {

    it('should move to home.prompt if the user is a judge', function() {
      // user is judge
      var data = {role: 'judge'};
      events.trigger('gameStarted', data); // gameStarted
      expect(state.go).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalledWith('home.prompt');
      state.go.calls.reset();
    });

    it('should move to home.waiting if the user is a player', function() {
      // switching to player
      var data = {role: 'player'};
      events.trigger('gameStarted', data); // gameStarted
      expect(state.go).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalledWith('home.waiting');
    });
  });

});