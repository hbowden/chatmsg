var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html'
        })
        .when('/login', {
            templateUrl: '/views/templates/login.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
