app.factory('user', ['$http', function($http) {

  function register(user) {
    var promise = $http({
      method: 'POST',
      data: user,
      url: '/user'
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
    return promise;
  }

  function validate() {
    return true;
  }

  function login(user) {
    var promise = $http({
      method: 'POST',
      data: user,
      url: '/'
    }).then(function successCallback(response) {
      return response;
    }, function errorCallback(response) {
      return response;
    });
    return promise;
  }

  return {
    register: register,
    validate: validate,
    login: login,
  }
}]);
