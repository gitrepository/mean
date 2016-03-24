'use strict';

angular.module('movies')
  .directive('youtube', function() {
    return {
      restrict: 'E',
      scope: {
        src: '='
      },
      templateUrl: 'modules/movies/client/views/youtube.html'
    };
  });
