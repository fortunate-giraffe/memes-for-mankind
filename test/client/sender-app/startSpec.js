'use strict';

describe('Start Controller', function() {
  var scope, ctrl; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller) {
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

});