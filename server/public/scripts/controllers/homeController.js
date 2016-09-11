app.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.handleRegister = function() {
    /* Change to the registration view. */
    $location.path('register');
  }
  $scope.handleLogin = function() {
    /* Change to the login view. */
    $location.path('login');
  }
}]);
