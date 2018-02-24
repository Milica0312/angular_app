var app=angular.module('myApp',["ngRoute"]);
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "views/main.html"

  })
  .when("/tables/users", {
    templateUrl : "views/users.html",
    controller : 'getUserDataController'
  })
  .when("/tables/uploads", {
    templateUrl : "views/uploads.html",
    controller : 'getUploadsDataController'
  })
  .when("/tables/car_purchases", {
    templateUrl : "views/car_purchases.html",
    controller : 'getCarDataController'
  })
  .otherwise({
    templateUrl : "views/404.html"
  })
  ;

}]);

 app.controller('getUserDataController', function($scope, $http) {
  $http({
  method : "GET",
  url : "tables/users.json"
  }).then(function mySuccess(response) {
    $scope.users = response.data;
    $scope.sort = function(keyname){
    $scope.sortBy = keyname;
    $scope.reverse = !$scope.reverse;
   }

  }, function myError(response) {
    $scope.users = response.statusText;
  });
});
 app.controller('getUploadsDataController', function($scope, $http) {
  $http({
  method : "GET",
  url : "tables/uploads.json"
  }).then(function mySuccess(response) {
    $scope.uploads = response.data;
    $scope.sort = function(keyname){
    $scope.sortBy = keyname;
    $scope.reverse = !$scope.reverse;
   }
  }, function myError(response) {
    $scope.users = response.statusText;
  });
});
 app.controller('getCarDataController', function($scope, $http) {
  $http({
  method : "GET",
  url : "tables/car_purchases.json"
  }).then(function mySuccess(response) {
    $scope.cars = response.data;
    $scope.sort = function(keyname){
    $scope.sortBy = keyname;
    $scope.reverse = !$scope.reverse;
   }
  }, function myError(response) {
    $scope.users = response.statusText;
  });
});
app.filter('removeUnderscores', [function() {
return function(string) {
  if (!angular.isString(string)) {
    return string;
  }
  return string.replace(/[/_/]/g, ' ');
 };
}]);
app.filter('capitalizeWord', function() {
  return function(text) {
    return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
  }
});
app.filter('dateFilter', function() {
   function calculateDate(date) {
       date = new Date(date);
       var year = date.getFullYear();
       var month = date.getMonth()+1;
       var day = date.getDate();
       return day+'-'+month+'-'+year;
   }

   return function(date) {
         return calculateDate(date);
   };
});
