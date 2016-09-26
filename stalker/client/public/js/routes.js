angular.module('app')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
	    .when("/login", {
		templateUrl: "/views/login.html",
		controller: "loginController as login",
		access: {restricted: false}
	    })
	    .when("/logout", {
		controller: "logoutController",
		access: {restricted: true}
	    })
	    .when("/register", {
		templateUrl: "/views/register.html",
		controller: "registerController as register",
		access: {restricted: false}
	    })
      
        $locationProvider.html5Mode(true);

}]);
