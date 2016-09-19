app.factory('xmpp', ['$http', function($http) {
  function setupClient(jid, pass, id) {
    var promise = $http({
      method: 'POST',
      data: {jid: jid, password: pass},
      url: '/xmpp/' + id
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
      return promise;
  }

  function connect(id) {
    var promise = $http({
      method: 'GET',
      url: '/xmpp/connect/' + id
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
      return promise;
  }

  return {
    setupClient: setupClient,
    connect: connect
  }
}]);
