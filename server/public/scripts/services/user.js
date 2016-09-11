app.factory('user', ['$http', function($http) {

  function register(user) {
    var promise = $http({
      method: 'POST',
      data: user,
      url: '/user'
    }).then(function successCallback(response) {
      console.log("Success: ", response);
      return response.data;
    }, function errorCallback(response) {
      console.log("Error: ", response);
      return response;
    });
    return promise;
  }

  function validate() {
    return true;
  }

  return {
    register: register,
    validate: validate
  }
}]);
