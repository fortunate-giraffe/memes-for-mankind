'use strict';

describe('Prompt Controller', function() {
  var scope, ctrl, game;

  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _game_) {
      game = _game_;
      scope = $rootScope.$new();
      spyOn(game, 'getPrompt').and.callFake(function() {
        return 'A prompt here';
      });
      ctrl = $controller('Prompt', {$scope: scope});
    });

  });

  it('should have a Prompt property', function() {
    expect(ctrl.prompt).toBeDefined();
  });

});