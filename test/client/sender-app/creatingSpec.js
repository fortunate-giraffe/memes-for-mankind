'use strict';

describe('Creating Controller', function() {
  var scope, state, q, ctrl, playerMessenger, playerUser, dataService, events; // using this in our tests

  // mock app
  beforeEach(function() {
    angular.mock.module('app');

    inject(function($rootScope, $controller, $state, $q, $httpBackend, _playerMessenger_, _playerUser_, _dataService_, _events_) {
      playerMessenger = _playerMessenger_;
      spyOn(playerMessenger, 'submit').and.callFake(function() {
            return 'submitted!';
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

      dataService = _dataService_;
      q = $q;
      spyOn(dataService, 'createMeme').and.callFake(function() {
        var deferred = q.defer();
        var returnObj = {result: 'results!'};
        deferred.resolve(returnObj);
        return deferred.promise;
      });

      events = _events_;
      state = $state;
      spyOn($state, 'go').and.callFake(function() {
        return 'went!';
      });

      $httpBackend.whenGET(/./).respond(200, { Response: 'a response' });
      $httpBackend.whenPOST(/./).respond(200, { result: 'a result' });

      scope = $rootScope.$new();
      ctrl = $controller('Creating', {$scope: scope});
    });
  });

  // tests here
  it('should start with empty string for Top Text', function() {
    expect(ctrl.topText).toEqual('');
  });

  it('should start with empty string for Bottom Text', function() {
    expect(ctrl.bottomText).toEqual('');
  });

  it('should have \'meme\' property and it should match what\'s in playerUser.getMemeChoice()', function() {
    expect(ctrl.meme).toBeDefined();
    expect(ctrl.meme).toEqual('http://cdn.meme.am/instances/500x/61310492.jpg');
  });

  it('should have \'submitCreation\' property', function() {
    expect(ctrl.submitCreation).toBeDefined();
  });

  describe('the submitCreation function', function() {

    it('should not call playerUser.getMemeChoice if top text and bottom text are null', function() {
      // reset it since this is called once on instantiation
      playerUser.getMemeChoice.calls.reset();
      ctrl.submitCreation();
      expect(playerUser.getMemeChoice).not.toHaveBeenCalled();
      playerUser.getMemeChoice.calls.reset();
    });

    it('should call playerUser.getMemeChoice if top text and bottom text exist', function() {
      ctrl.bottomText = 'bottoms';
      ctrl.topText = 'toppings';
      ctrl.submitCreation();
      expect(playerUser.getMemeChoice).toHaveBeenCalled();
    });

    it('should call dataService.createMeme to create the meme', function() {
      playerMessenger.submit.calls.reset();
      ctrl.bottomText = 'bottoms';
      ctrl.topText = 'toppings';
      ctrl.submitCreation();
      expect(dataService.createMeme).toHaveBeenCalled();
    });

    it('should change state to home.waiting after the meme is created', function() {
      state.go.calls.reset();
      ctrl.bottomText = 'bottoms';
      ctrl.topText = 'toppings';
      ctrl.submitCreation();
      expect(state.go).toHaveBeenCalledWith('home.waiting');
    });

  });
});