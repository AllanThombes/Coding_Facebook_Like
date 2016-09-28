angular.module('app')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when("/", {
    templateUrl: "/views/users.html",
    controller: "homeController as usr",
    access: {restricted: true}
  })
  .when("/login", {
    templateUrl: "/views/login.html",
    controller: "loginController as login",
    access: {restricted: false}
  })
  .when("/logout", {
    controller: "logoutController",
    templateUrl: "/views/login.html",
    access: {restricted: true}
  })
  .when("/register", {
    templateUrl: "/views/register.html",
    controller: "registerController as register",
    access: {restricted: false}
  })

  $locationProvider.html5Mode(true);

}]);
