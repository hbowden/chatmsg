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
      if(response.status != 200) {
        console.log("Can't create user");
        return;
      }
      /* Clear form fields. */
      $scope.user = {};

      /* Send user to the login page. */
      $location.path('/login');
    });
  }

  $scope.loginUser = function() {
    user.login($scope.user).then(function(response) {
      if(response.status != 200) {
        console.log("Can't create user");
        return;
      }
      /* Clear form fields. */
      $scope.user = {};
      console.log("Data: ", response.data)
      user.setUser(response.data);
      $location.path('/chat');
  });
}
}]);
