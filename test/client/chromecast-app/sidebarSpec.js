'use strict';

describe('Sidebar Controller', function() {
  var scope, ctrl, game;

  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _game_) {
      game = _game_;
      scope = $rootScope.$new();
      ctrl = $controller('Sidebar', {$scope: scope});
    });

  });

  it('should have a players property', function() {
    expect(ctrl.players).toEqual([]);
  });

});