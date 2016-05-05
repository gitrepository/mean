'use strict';

angular.module('movies')
  .directive('fileModel', ['$parse', function($parse) {
      console.log('qaz');
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
              console.log('In file Directive out');

        element.bind('change', function() {
          scope.$apply(function() {
              console.log('In file Directive');
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);
