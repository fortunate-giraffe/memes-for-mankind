(function () {
  'use strict';
  angular.module('app.events', [])
    .factory('events', events);

  events.$inject = ['$rootScope'];

  function events ($rootScope) {
    var eventHandlers = {};

    return {
      on: registerEventHandler,
      trigger: trigger
    };

    function trigger (event, data, sender) {
      var handlers = eventHandlers[event];
      if (handlers) {
        if (!$rootScope.$$phase) { // don't use $apply if already in a digest cycle
          $rootScope.$apply(function () {
            runHandlers(handlers);
          });
        } else {
          runHandlers(handlers);
        }
      }

      function runHandlers () {
        handlers.forEach(function (fn) {
          fn(data, sender);
        });
      }
    }

    function registerEventHandler (event, handler) {
      eventHandlers[event] = eventHandlers[event] || [];
      eventHandlers[event].push(handler);
    }

  }
})();

