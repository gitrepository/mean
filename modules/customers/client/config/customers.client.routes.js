'use strict';

// Setting up route
angular.module('customers').config(['$stateProvider',
  function($stateProvider) {
    // Customers state routing
    $stateProvider.
    state('listCustomers', {
      url: '/customers',
      templateUrl: 'modules/customers/client/views/list-customers.client.view.html'
    });
  }
]);
