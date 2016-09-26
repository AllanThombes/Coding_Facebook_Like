angular.module('app')
    .controller('MainController', function($scope) {
        this.title = 'Default';
    })
    .controller('homeController', ["$scope", "$http", "$location", "AuthService", function($scope, $http, $location, AuthService) {
        var _this = this;

	if (!AuthService.isLoggedIn()) $location.path("/login");
        $scope.main.title = 'Messages';

        // this.getMessages = function() {
        //     $http.get('/messages')
        //         .then(function(res) {
        //             _this.messages = res.data;
        //         });
        // };
        //
        // this.getMessages();
        //
        // this.removeMessage = function(id) {
        //     $http.delete('/messages/' + id)
        //     .then(function() {
        //         _this.getMessages();
        //     });
        // };
        //
        // this.sendMessage = function() {
        //     if (!this.newmsg || !this.newmsg.title || !this.newmsg.text)
        //         return ;
        //     $http.post('/messages', this.newmsg)
        //     .then(function() {
        //         _this.getMessages();
        //     });
        //     this.newmsg = {};
        // };

    }])
    .controller('logoutController',
		['$scope', '$location', 'AuthService',
		 function ($scope, $location, AuthService) {

		     $scope.logout = function () {

			 AuthService.logout()
			     .then(function () {
				 $location.path('/login');
			     });

		     };

		 }])
    .controller('registerController',
		['$scope', '$location', 'AuthService',
		 function ($scope, $location, AuthService) {

		     $scope.main.title = "Give us your informations!";

		     $scope.register_form = function () {

			 $scope.error = false;
			 $scope.disabled = true;
       console.log("sale enfoiré de merde qui pue la pisse de rat!");
			 AuthService.register($scope.registerForm.username, $scope.registerForm.password)
			     .then(function () {
             console.log("bordel a cul");
				 $location.path('/login');
				 $scope.disabled = false;
				 $scope.registerForm = {};
			     })
			     .catch(function () {
				 $scope.error = true;
				 $scope.errorMessage = "Nice try. Next time maybe...";
				 $scope.disabled = false;
				 $scope.registerForm = {};
			     });

		     };

		 }]);


angular.module('app')
    .run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
		       function (event, next, current) {
			   AuthService.getUserStatus()
		               .then(function(){
			           if (next.access.restricted && !AuthService.isLoggedIn()){
				       $location.path('/login');
				       $route.reload();
				   }
			       });
		       });
    });
