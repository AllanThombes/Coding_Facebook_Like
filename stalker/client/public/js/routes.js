angular.module('app')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when("/", {
    controller: "profileController as profile",
    templateUrl: "/views/profile.html",
    access: {restricted: true}
  })
  .when("/profile/:id", {
    controller: "otherProfileController as otherProfile",
    templateUrl: "/views/otherProfile.html",
    access: {restricted: true}
  })
  .when("/profile", {
    controller: "profileController as profile",
    templateUrl: "/views/profile.html",
    access: {restricted: true}
  })
  .when("/album", {
    controller: "albumController as album",
    templateUrl: "/views/album.html",
    access: {restricted: true}
  })
  .when("/upload", {
    controller: "uploadController as upload",
    templateUrl: "/views/addPics.html",
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
  .otherwise("/login", {
    templateUrl: "/views/login.html",
    controller: "loginController as login",
    access: {restricted: false}
  })

  $locationProvider.html5Mode(true);

}]);
