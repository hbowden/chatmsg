app.controller('ChatController', ['$scope', 'deepstream', 'user', function($scope, deepstream, user) {
  /* Grab our user information and use it
    to set $scope variables, we use these
    variables to build the view. */
  var user = user.getUser();
 	$scope.contacts = user.contacts;
  $scope.activity = user.messages;
  $scope.user = user;
  console.log("User: ", user);

  /* Check for a contact list. If it's
  empty fill the contact list with empty contacts.
  if($scope.contacts.length == 0) {
    $scope.contact = [];
    for(var i = 0; i < 25; i++) {
      $scope.contacts.push({title: ''});
    }
  }
  */


}]);
