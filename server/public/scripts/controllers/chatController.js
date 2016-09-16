app.controller('ChatController', ['$scope', '$http', 'deepstream', 'user', '$location', function($scope, $http, deepstream, user, $location) {
  /* Grab our user information and use it
    to set $scope variables, we use these
    variables to build the view. */
  var user = user.getUser();
 	$scope.contacts = user.contacts;
  $scope.activity = user.messages;
  $scope.user = user;

  var result = true;

  /* Check if the user information is empty. This can happen if the
    user reloads the page. If the user object is empty, load the user
    object from the server. */
  if(user.hasOwnProperty("contacts") == false) {
    console.log("Empty");
    $http({
      method: 'GET',
      url: '/user/auth'
    }).then(function successCallback(response) {
       result = response.data;
       if(result === false) {
         /* User is not logged in so send them to the login page. */
         $location.path('login')
         return;
       }
       $scope.user = result;
       console.log("user: ", $scope.user);
    }, function errorCallback(response) {
       console.log("Error grabbing user data: ", response.data);
    });
  } else {
    console.log("Not empty");
  }
}]);
