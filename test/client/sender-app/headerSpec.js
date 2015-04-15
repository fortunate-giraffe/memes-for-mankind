'use strict';

describe('Header Controller', function() {
  var scope, ctrl, playerMessenger, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, _playerMessenger_, _events_) {
      playerMessenger = _playerMessenger_;
      events = _events_;

      // variable to track the status of the button, starts with true
      var start = true;
      // spy on player messenger's methods that are used
      spyOn(playerMessenger, 'getConnectionStatus').and.callFake(function() {
            start = !start;
            return start;
          });

      scope = $rootScope.$new();
      ctrl = $controller('Header', {$scope: scope});
    });
  });

  // tests here
  describe('the chromecast button', function() {
    it('should be false at the start (showing)', function() {
      // should show when you first come to the page
      expect(ctrl.castButtonState).toEqual(false);
    });

    it('should be true after a chromecastConnection event (hidden)', function() {
      // should show when you first come to the page
      events.trigger('chromecastConnection');
      expect(ctrl.castButtonState).toEqual(true);
    });
  });
});