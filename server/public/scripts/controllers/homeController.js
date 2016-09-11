app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  $scope.handleRegister = function() {
    console.log("Clicked register");
  }
  $scope.handleLogin = function() {
    console.log("Clicked login");
  }
}]);
