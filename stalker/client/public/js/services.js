angular.module("app")
    .factory("AuthService",
	     ["$q", "$timeout", "$http", "$rootScope",
	      function($q, $timeout, $http, $rootScope){

		  var user = null;

		  function isLoggedIn(){
		      if (user) return true;
		      return false;

		  }

		  function getUserStatus(){
		      return $http.get('/user/status')
		          .success(function (data) {
			      if (data.status){
				  user = true;
				  $rootScope.loggedIn = true;
			      }
			      else {
				  user = false;
				  $rootScope.loggedIn = false;
			      }
			  })
		          .error(function (data) {
			      user = false;
			  });
		  }

		  function login(username, password){
		      var deferred = $q.defer();

		      $http.post('/user/login',
				 {username: username, password: password})
			  .success(function(data, status){
			      if (status == 200 && data.status){
				  user = true;
				  $rootScope.loggedIn = true;
				  deferred.resolve();
			      }
			      else {
				  user = false;
				  $rootScope.loggedIn = false;
				  deferred.reject();
			      }
			  })
			  .error(function(data){
			      user = false;
			      $rootScope.loggedIn = false;
			      deferred.reject();
			  });
		      return deferred.promise;
		  }

		  function logout(){
		      var deferred = $q.defer();
		      $rootScope.loggedIn = false;
		      $http.get("/user/logout")
			  .success(function(data){
			      user = false;
			      deferred.resolve();
			  })
			  .error(function(data){
			      user = false;
			      deferred.reject();
			  });

		      return deferred.promise;
		  }

		  function register(username, password, lastname, firstname, address){
		      var deferred = $q.defer();

		      $http.post("/user/register",
				 {username: username, password: password, lastname: lastname, firstname: firstname, address: address})
			  .success(function(data, status){
			      if (status == 200 && data.status){
				  $rootScope.loggedIn = true;
				  user = true;
				  deferred.resolve();
			      }
			      else
				  deferred.reject();
			  })
			  .error(function(data){
			      deferred.reject();
			  });

		      return deferred.promise;
		  }

		  return ({
		      isLoggedIn: isLoggedIn,
		      getUserStatus: getUserStatus,
		      login: login,
		      logout: logout,
		      register: register
		  });
	      }]);
