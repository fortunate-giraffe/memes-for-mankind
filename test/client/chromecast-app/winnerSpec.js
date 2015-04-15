'use strict';

describe('Winner Controller', function() {
  var scope, ctrl, game;

  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, _game_) {
      game = _game_;
      scope = $rootScope.$new();
      spyOn(game, 'getWinner').and.callFake(function() {
        return 'Joaquin Miller';
      });
      ctrl = $controller('Winner', {$scope: scope});
    });

  });

  it('should have a winner property', function() {
    expect(ctrl.winner).toBeDefined();
  });

});