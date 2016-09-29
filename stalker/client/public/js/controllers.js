angular.module('app')
    .controller('MainController', function($scope) {
        this.title = 'Home';
    })
    .controller('homeController', ["$scope", "$http", "$location", "AuthService", function($scope, $http, $location, AuthService) {
        var _this = this;

	if (!AuthService.isLoggedIn()) $location.path("/login");
        // $scope.main.title = 'Users';
        // this.getUsers = function() {
        //     $http.get('/users')
        //         .then(function(res) {
        //             _this.users = res.data;
        //         });
        // };
        //
        // this.getUsers();

        $scope.main.title = 'Messages';

        this.getMessages = function() {
            $http.get('/messages')
                .then(function(res) {
                    _this.messages = res.data;
                });
        };

        this.getMessages();

        this.removeMessage = function(id) {
            $http.delete('/messages/' + id)
            .then(function() {
                _this.getMessages();
            });
        };

        this.sendMessage = function() {
            if (!this.newmsg || !this.newmsg.title || !this.newmsg.text)
                return ;
            $http.post('/messages', this.newmsg)
            .then(function() {
                _this.getMessages();
            });
            this.newmsg = {};
        };

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
         $scope.logout();
		 }])
    .controller('registerController',
		['$scope', '$location', 'AuthService',
		 function ($scope, $location, AuthService) {

		     $scope.main.title = "Give us your informations!";

		     $scope.register_form = function () {

			 $scope.error = false;
			 $scope.disabled = true;
			 AuthService.register($scope.registerForm.username, $scope.registerForm.email, $scope.registerForm.password, $scope.registerForm.lastname, $scope.registerForm.firstname, $scope.registerForm.address)
			     .then(function () {
				 $location.path('/login');
				 $scope.disabled = false;
				 $scope.registerForm = {};
			     })
			     .catch(function () {
				 $scope.error = true;
				 $scope.errorMessage = "Nice try. Maybe next time...";
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
