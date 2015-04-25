(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('ngEnterKey', ngEnterKey);

    function ngEnterKey() {
      return function(scope, element, attrs) {

        console.log('into the directive');

        element.bind('keydown keypress', function(event) {
          var keyCode = event.which || event.keyCode;

          // If enter key is pressed
          if (keyCode === 13) {
            console.log('enter key pushed');
            scope.$apply(function() {
              // Evaluate the expression
              scope.$eval(attrs.ngEnterKey);
            });

            event.preventDefault();
          }
        });
      };
    }
})();
