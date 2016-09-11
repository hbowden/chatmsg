app.controller('LoginController', ['$scope', '$http', '$location', 'user', function($scope, $http, $location, user) {
  $scope.submitRegistration = function() {
    /* Validate the user submitted
    username and password.*/
    if(user.validate() == false) {
      console.log("Invalid form submission");
      return;
    }

    /* Submit the user's credentials, ie username and password
    to the server for registration. */
    user.register($scope.user).then(function(response) {
      console.log("response: ", response);
    });
  }
}]);
