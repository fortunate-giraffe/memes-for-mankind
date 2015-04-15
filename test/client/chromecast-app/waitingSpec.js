'use strict';

describe('Waiting Controller', function() {
  var scope, ctrl, game;

  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _game_) {
      game = _game_;
      scope = $rootScope.$new();
      ctrl = $controller('Waiting', {$scope: scope});
    });

  });

  it('should have a mainContent property', function() {
    expect(ctrl.mainContent).toBeDefined();
  });

  describe('The mainContent object', function() {
    it('should have a waitingForPlayers property with text and image properties', function() {
      expect(ctrl.mainContent.waitingForPlayers).toBeDefined();
      expect(ctrl.mainContent.waitingForPlayers.text).toBeDefined();
      expect(ctrl.mainContent.waitingForPlayers.image).toBeDefined();
    });
    it('should have a readyToPlay property with text and image properties', function() {
      expect(ctrl.mainContent.readyToPlay).toBeDefined();
      expect(ctrl.mainContent.readyToPlay.text).toBeDefined();
      expect(ctrl.mainContent.readyToPlay.image).toBeDefined();
    });
    it('should have a waitingForPrompt property with text and image properties', function() {
      expect(ctrl.mainContent.waitingForPrompt).toBeDefined();
      expect(ctrl.mainContent.waitingForPrompt.text).toBeDefined();
      expect(ctrl.mainContent.waitingForPrompt.image).toBeDefined();
    });
  });

  it('should have a status variable', function() {
    expect(status).toBeDefined();
  });

  it('should have a currentDisplay property', function() {
    expect(ctrl.currentDisplay).toBeDefined();
  });

});