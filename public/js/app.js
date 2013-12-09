'use strict';

// Declare app level module which depends on filters, and services
angular.module('custApp', ['custApp.filters', 'custApp.services', 'custApp.directives', 'ngUpload']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../partials/HomeView'
      }).
      when('/custman', {
        templateUrl: '../partials/CustListItemView',
        controller: CustmanListItemCtrl
      }).
      when('/custman/:id', {
        templateUrl: '../partials/EditCustView',
        controller: EditCustCtrl
      }).
      when('/addCust', {
        templateUrl: '../partials/AddCustView',
        controller: AddCustCtrl
      }).
      when('/about', {
        templateUrl: '../partials/AboutView',
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);