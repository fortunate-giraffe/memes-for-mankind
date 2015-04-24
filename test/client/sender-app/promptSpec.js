'use strict';

describe('Prompt Controller', function() {
  var scope, state, ctrl, playerMessenger, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, $httpBackend, _playerMessenger_, _events_) {
      playerMessenger = _playerMessenger_;
      events = _events_;
      // spy on player messenger's methods that are used
      spyOn(playerMessenger, 'submit').and.callFake(function() {
            return 'submitted!';
          });
      state = $state;
      spyOn(state, 'go').and.callFake(function() {
            return 'went!';
          });

      $httpBackend.whenGET(/./).respond(200, { Response: 'a response' });

      scope = $rootScope.$new();
      ctrl = $controller('Prompt', {$scope: scope});
    });
  });

  // tests here
  it('should start with empty string as prompt', function() {
    expect(ctrl.prompt).toEqual('');
  });

  it('should have submitPrompt function', function() {
    expect(typeof ctrl.submitPrompt).toEqual('function');
  });

  describe('the submitPrompt function', function() {
    it('should call playerMessenger.submit', function() {
      ctrl.prompt = 'test prompt';
      ctrl.submitPrompt();
      expect(playerMessenger.submit).toHaveBeenCalled();
    });

    it('should call playerMessenger.submit with the submitted prompt in an obj', function() {
      ctrl.prompt = 'hopeless panda';
      ctrl.submitPrompt();
      expect(playerMessenger.submit).toHaveBeenCalledWith({prompt: 'hopeless panda'});
    });

  });
});
