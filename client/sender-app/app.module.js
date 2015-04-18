(function() {
  'use strict';

  angular.module('app', [
      /*
       * Angular components
       */
      'ui.router',

      /*
       * Feature areas
       */
      'app.layout',
      'app.waiting',
      'app.creating',
      'app.choosing',
      'app.start',
      'app.prompt',
      'app.done',
      'app.core',
      'app.config',

      /*
       * Services
       */
      'app.data-service',
      'app.player-user',

      /*
       * Messaging
       */
      'app.player-messenger',
      'app.messaging',
      'app.cast-sender'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/home/start');
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      templateUrl: 'layout/shell.html',
      controller: 'Shell'
    })
    .state('home.creating', {
      url: '/home/creating',
      views: {
        body: {
          controller: 'Creating',
          controllerAs: 'vm',
          templateUrl: 'creating/creating.html'
        }
      }
    })
    .state('home.choosing', {
      url: '/home/choosing',
      views: {
        body: {
          controller: 'Choosing',
          controllerAs: 'vm',
          templateUrl: 'choosing/choosing.html'
        }
      }
    })
    .state('home.waiting', {
      url: '/home/waiting',
      views: {
        body: {
          controller: 'Waiting',
          controllerAs: 'vm',
          templateUrl: 'waiting/waiting.html'
        }
      }
    })
    .state('home.start', {
      url: '/home/start',
      views: {
        body: {
          controller: 'Start',
          controllerAs: 'vm',
          templateUrl: 'start/start.html'
        }
      }
    })
    .state('home.prompt', {
      url: '/home/prompt',
      views: {
        body: {
          controller: 'Prompt',
          controllerAs: 'vm',
          templateUrl: 'prompt/prompt.html'
        }
      }
    })
    .state('home.done', {
      url: '/home/done',
      views: {
        body: {
          controller: 'Done',
          controllerAs: 'vm',
          templateUrl: 'done/done.html'
        }
      }
    });

  }]);

})();