app.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.submitRegistration = function() {
    /* Submit the user's credentials, ie username and password
    to the server for registration. */
    $userFactory.register($scope.user).then(function(response) {
      console.log("response: ", response);
    });
  }
}]);
