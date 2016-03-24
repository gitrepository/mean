'use strict';

angular.module('movies')
  .filter('trusted', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
