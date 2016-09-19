app.factory('message', ['$http', function($http) {
  function getAll(user) {
    var url = '/message/' + user._id;
    console.log("url: ", url);
    var promise = $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
    return promise;
  }
  function loadServices() {
    var promise = $http({
      method: 'GET',
      url: "/services"
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      console.log("response: ", response);
      return response;
    });
    return promise;
  }
  return {
    getAll: getAll,
    loadServices: loadServices
  }
}]);
