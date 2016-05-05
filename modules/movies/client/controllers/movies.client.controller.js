(function() {
  'use strict';

  // Movies controller
  angular
    .module('movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$scope', '$state', 'Authentication', 'movieResolve', 'Upload'];

  function MoviesController($scope, $state, Authentication, movie, Upload) {
    var vm = this;

    vm.authentication = Authentication;
    vm.movie = movie;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Movie
    function remove() {
      console.log('l');
      alert('l');

      if (confirm('Are you sure you want to delete?')) {
        vm.movie.$remove($state.go('movies.list'));
      }
    }

    // Save Movie
    function save(isValid) {
			console.log(vm.movie.file);
			
			        Upload.upload({
            url: '/api/moviesUpload',
            data: {file: vm.movie.file, 'test': 'test123'},
								headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

			/*
      var file = $scope.myFile;

      vm.movie.filefield = file;

			
			
      console.log(vm.movie);

      // TODO: move create/update logic to service
      if (vm.movie._id) {
        vm.movie.$update(successCallback, errorCallback);
      } else {
        vm.movie.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('movies.view', {
          movieId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
			*/
    }
  }
})();
