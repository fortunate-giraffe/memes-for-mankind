'use strict';

describe('Choosing Controller', function() {
  var scope, ctrl, game;

  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _game_) {
      game = _game_;
      scope = $rootScope.$new();
      spyOn(game, 'getMemes').and.callFake(function() {
        return ['memes'];
      });
      ctrl = $controller('Choosing', {$scope: scope});
    });
  });

  it('should have a submissions property', function() {
    expect(ctrl.submissions).toBeDefined();
  });

});
