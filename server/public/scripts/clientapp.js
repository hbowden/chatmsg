var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
