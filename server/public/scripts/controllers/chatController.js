app.controller('ChatController', ['$scope', '$http', 'deepstream', 'user', '$location', 'message', 'xmpp', 'contacts', function($scope, $http, deepstream, user, $location, message, xmpp, contacts) {
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
  var currentContact;
  var JID;

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
       var user = result;
       console.log("id: ", user._id);
       start(user);
    }, function errorCallback(response) {
       console.log("Error grabbing user data: ", response.data);
    });
  } else {
    console.log("Not empty");
  }

  function start(user) {
    contacts.load(user._id).then(function(res) {
      $scope.contacts = res.data;
    });

    message.loadServices().then(function(services) {
      console.log("Service: ", services.data);
      $scope.services = services.data;
    });

    xmpp.connect(user._id).then(function(res) {
      if(res.status == 200) {
        console.log("Connected: ", res.data);
        JID = res.data.jid;
        $scope.send = function(text) {
          var msg = {};
          msg.text = text;
          msg.toJid = currentContact.jid;
          msg.fromJid = JID;

          message.send(msg).then(function(res) {
            console.log("res");
          });
        }
        return;
      } else {
        console.log("Not connected: ", res.data);
        return;
      }
    });

    message.getAll(user).then(function(messages) {
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
          JID = service.jid;
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
      console.log("id1: ", id);
      $http({
        method: 'POST',
        data: contact,
        url: '/contacts/' + id
      }).then(function successCallback(response) {
        console.log("id2: ", id);
        contacts.load(id).then(function(res) {
          $scope.contacts = res.data;

        });
      }, function errorCallback(response) {
         console.log("Error posting new contact: ", response.data);
      });
    }

    $scope.changeMessageView = function(contact) {
      currentContact = contact;
      console.log("contact: ", currentContact);
    }
  }
}]);
