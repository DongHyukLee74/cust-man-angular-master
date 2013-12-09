'use strict';

/* Controllers */
function CustmanListItemCtrl($scope, $http) {
  $http.get('/api/custman').
    success(function(data, status, headers, config) {
      $scope.custman = data.custman;
    });
}

function AddCustCtrl($scope, $http, $location) {
  $scope.form = {};

  // $scope.uploadComplete = function (content, completed) {
  // };
  $scope.home = function () {
    $location.url('/custman/');
  };
}

function EditCustCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  
  $http.get('/api/custman/' + $routeParams.id).success(function(data) {
    $scope.form = data.cust;
  });
  $scope.deleteCust = function () {
    $http.delete('/api/custman/' + $routeParams.id).success(function(data) {
      $location.url('/custman/');
    });
  };
}
