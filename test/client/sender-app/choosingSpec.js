'use strict';

describe('Choosing Controller', function() {
  var scope, state, q, ctrl, playerMessenger, playerUser, dataService, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, $q, $compile, $httpBackend, _playerMessenger_, _playerUser_, _dataService_, _events_) {
      playerMessenger = _playerMessenger_;
      spyOn(playerMessenger, 'selectWinner').and.callFake(function() {
            return 'winner selected!';
          });

      playerUser = _playerUser_;
      // spy on player messenger's methods that are used
      spyOn(playerUser, 'getMemeChoice').and.callFake(function() {
            return {
              imageUrl:'http://cdn.meme.am/instances/500x/61310492.jpg',
              generatorID: 12,
              imageID: 12
            };
          });
    spyOn(playerUser, 'setMemeChoice').and.callFake(function() {
          return {
            imageUrl:'http://cdn.meme.am/instances/500x/61310492.jpg',
            generatorID: 12,
            imageID: 12
          };
        });

      dataService = _dataService_;
      q = $q;
      spyOn(dataService, 'getMemes').and.callFake(function() {
        var deferred = q.defer();
        var returnObj = {result: [1, 2, 3, 4, 5]};
        deferred.resolve(returnObj);
        return deferred.promise;
      });

      events = _events_;
      state = $state;
      spyOn($state, 'go').and.callFake(function() {
        return 'went!';
      });

      $httpBackend.whenGET(/./).respond(200, { Response: 'a response' });

      // compile = $compile;
      scope = $rootScope.$new();
      ctrl = $controller('Choosing', {$scope: scope});
    });
  });

  // tests here
  it('should start with title \'Choose your meme!\'', function() {
    expect(ctrl.title).toEqual('Choose your meme!');
  });

  it('should start with null for chosenMeme', function() {
    expect(ctrl.chosenMeme).toBe(null);
  });

  it('should have moveOn property and it should be a function', function() {
    expect(ctrl.moveOn).toBeDefined();
    expect(typeof ctrl.moveOn).toEqual('function');
  });

  it('should have a role property', function() {
    expect(ctrl.role).toBeDefined();
  });

  it('should have a clickHandler property and it should be a function', function() {
    expect(ctrl.clickHandler).toBeDefined();
    expect(typeof ctrl.clickHandler).toEqual('function');
  });

  it('should call dataService.getMemes on init', function() {
    expect(dataService.getMemes).toHaveBeenCalled();
  });

  describe('the moveOn function', function() {

    it('should move to home.waiting if the user is the judge', function() {
      playerUser.setRole('judge');
      ctrl.moveOn();
      expect(state.go).toHaveBeenCalledWith('home.waiting');
    });

    it('should move to home.creating if the user is a player', function() {
      state.go.calls.reset();
      playerUser.setRole('player');
      ctrl.moveOn();
      expect(state.go).toHaveBeenCalledWith('home.creating');
    });

  });

  describe('the clickHandler function', function() {

    it('should move to home.waiting if the user is the judge', function() {
      // fake event object to trick our clickHandler
      var fakeEvent = {
        target: {
          attributes: {
            'ng-bind': {
              nodeValue: '{"x":2,"y":3,"z":4}'
            }
          }
        }
      };
      ctrl.clickHandler(fakeEvent);
      expect(playerUser.setMemeChoice).toHaveBeenCalled();
    });
  });
});