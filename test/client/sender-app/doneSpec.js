'use strict';

describe('Done Controller', function() {
  var scope, ctrl, playerMessenger; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, _playerMessenger_) {
      playerMessenger = _playerMessenger_;
      // spy on player messenger's methods that are used
      spyOn(playerMessenger, 'startNextRound').and.callFake(function() {
            return 'starting a new round!';
          });

      scope = $rootScope.$new();
      ctrl = $controller('Done', {$scope: scope});
    });
  });

  // tests here
  it('should have a startNextRound property', function() {
    expect(ctrl.startNextRound).toBeDefined();
  });

  describe('the startNextRound property', function() {
    it('should call the playerMessenger.startNextRound Fn', function() {
      // should show when you first come to the page
      ctrl.startNextRound();
      expect(playerMessenger.startNextRound).toHaveBeenCalled();
    });
  });

});