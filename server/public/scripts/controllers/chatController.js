app.controller('ChatController', ['$scope', '$http', 'deepstream', 'user', '$location', 'message', 'xmpp', function($scope, $http, deepstream, user, $location, message, xmpp) {
  /* Grab our user information and use it
    to set $scope variables, we use these
    variables to build the view. */
  var user = user.getUser();
 	$scope.contacts = user.contacts;
  $scope.activity = user.messages;
  $scope.user = user;

  var result = true;
  var setupService;
  var contactService;

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

  message.loadServices().then(function(services) {
    console.log("Service: ", services.data);
    $scope.services = services.data;
  });

  message.getAll($scope.user).then(function(messages) {
    console.log("messages: ", messages.data);
  });

  $scope.saveService = function(service) {
    console.log("Click: ", service);
    setupService = service;
  };

  $scope.handleAddService = function(service) {
    if(setupService == 'xmpp') {
      xmpp.setupClient(service.jid, service.password, user._id).then(function(response) {
        console.log("response: ", response);
      });
      return;
    }
  };

  $scope.saveContactService = function(service) {
    contactService = service;
  }

  $scope.handleAddContact = function(contact) {
    contact.service = contactService;
    var id = user._id;
    $http({
      method: 'POST',
      data: contact,
      url: '/contacts/' + id
    }).then(function successCallback(response) {
       console.log('id: ', id);
       $http({
         method: 'GET',
         url: '/contacts/' + id
       }).then(function successCallback(response) {
          console.log("response: ", response);
          $scope.contacts = response.data;
          return;
       });
    }, function errorCallback(response) {
       console.log("Error posting new contact: ", response.data);
    });
  }
}]);
