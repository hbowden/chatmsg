app.factory('contacts', ['$http', function($http) {
  function load(id) {
    var promise = $http({
      method: 'GET',
      url: '/contacts/' + id
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
      return promise;
  }

  return {
    load: load
  }
}]);
