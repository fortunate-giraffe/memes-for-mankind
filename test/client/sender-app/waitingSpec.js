'use strict';

describe('Waiting Controller', function() {
  var scope, state, ctrl, playerMessenger, playerUser, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, $httpBackend, _playerMessenger_, _playerUser_, _events_) {
      playerMessenger = _playerMessenger_;
      playerUser = _playerUser_;
      events = _events_;
      // spy on player messenger's methods that are used
      state = $state;
      spyOn(state, 'go').and.callFake(function() {
            return 'went!';
          });

      $httpBackend.whenGET(/./).respond(200, { Response: 'a response' });

      scope = $rootScope.$new();
      ctrl = $controller('Waiting', {$scope: scope});
    });
  });

  // tests here
  describe('the state listeners', function() {

    it('should move to home.choosing if the prompt is submitted and user isn\'t a judge', function() {
      // user is not judge
      playerUser.setRole('player');
      events.trigger('promptSubmitted'); // gameStarted
      expect(state.go).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalledWith('home.choosing');
      state.go.calls.reset();
    });

    it('should move to home.choosing if startJudging event occurs and the user is a judge', function() {
      // user is judge
      playerUser.setRole('judge');
      events.trigger('startJudging', {memes: []}); // gameStarted
      expect(state.go).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalledWith('home.choosing');
      state.go.calls.reset();
    });

    it('should move to home.done if if game is done', function() {
      events.trigger('done'); // gameStarted
      expect(state.go).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalledWith('home.done');
    });
  });

});