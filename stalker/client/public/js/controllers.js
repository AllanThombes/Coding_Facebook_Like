angular.module('app')
.controller('MainController', function($scope) {
  this.title = 'Home';
})
.controller('homeController', ["$scope", "$http", "$location", "AuthService", function($scope, $http, $location, AuthService) {
  var _this = this;

  if (!AuthService.isLoggedIn()) $location.path("/login");

  $scope.main.title = 'Messages';

  this.getMessages = function() {
    $http.get('/messages/messages')
    .then(function(res) {
      _this.messages = res.data;
    });
  };

  this.getMessages();

  this.removeMessage = function(id) {
    $http.delete('/messages/messages/' + id)
    .then(function() {
      _this.getMessages();
    });
  };

  this.editMessage = function(id) {
    $http.post('/messages/messages/' + id)
    .then(function() {
      _this.getMessages();
    });
  };

  this.sendMessage = function() {
    if (!this.newmsg || !this.newmsg.text)
    return ;
    $http.post('/messages/messages', this.newmsg)
    .then(function() {
      _this.getMessages();
    });
    this.newmsg = {};
  };

}])
.controller('profileController', ["$scope", "$http", "$location", "AuthService", function($scope, $http, $location, AuthService) {
  var _this = this;
  if (!AuthService.isLoggedIn()) $location.path("/login");
  $scope.main.title = 'Profile';

  this.getUser = function() {
    $http.get('/users/userprofile')
    .then(function(res) {
      _this.user = res.data;
    });
  };

  this.getUser();

  this.getFriends = function() {
    $http.get('/users/listfriend')
    .then(function(res) {
      _this.listFriends = res.data;
    });
  };

  this.getFriends();

  this.getAskings = function() {
    $http.get('/users/listasking')
    .then(function(res) {
      _this.listAskingFriends = res.data;
    });
  };

  this.getAskings();

  this.getAsked = function() {
    $http.get('/users/listasked')
    .then(function(res) {
      _this.listAskedFriends = res.data;
    });
  };

  this.getAsked();

  this.getUsers = function() {
    $http.get('/users/users')
    .then(function(res) {
      _this.listOthers = res.data;
    });
  };

  this.getUsers();

  this.askFriend = function(id) {
    console.log(id);
    $http.put('/users/askfriend/' + id)
    .then(function(res) {
      _this.getUsers();
      _this.getAsked();
    });
  };

  this.reject = function(id) {
    $http.put('/users/rejectask/' + id)
    .then(function(res) {
      _this.getUsers();
      _this.getAskings();
    });
  };

  this.addFriend = function(id) {
    $http.put('/users/addfriend/' + id)
    .then(function(res) {
      _this.getFriends();
      _this.getAskings();
    });
  };

  this.unFriend = function(id) {
    $http.delete('/users/removefriend/' + id)
    .then(function(res) {
      _this.getFriends();
      _this.getUsers();
    });
  };

  this.getMessages = function() {
    $http.get('/messages/messages')
    .then(function(res) {
      _this.messages = res.data;
    });
  };

  this.getMessages();


  this.getAlbums = function() {
    $http.get('/albums/albums')
    .then(function(res) {
      _this.listAlbums = res.data;
    });
  };

  this.getAlbums();


  this.removeMessage = function(id) {
    $http.delete('/messages/messages/' + id)
    .then(function() {
      _this.getMessages();
    });
  };

  this.editMessage = function(id) {
    $http.post('/messages/messages/' + id)
    .then(function() {
      _this.getMessages();
    });
  };

  this.sendMessage = function() {
    if (!this.newmsg || !this.newmsg.text)
    return ;
    $http.post('/messages/messages', this.newmsg)
    .then(function() {
      _this.getMessages();
    });
    this.newmsg = {};
  };

}])
.controller('albumController', ["$scope", "$http", "$location", "AuthService", function($scope, $http, $location, AuthService) {
  var _this = this;

  if (!AuthService.isLoggedIn()) $location.path("/login");

  $scope.main.title = 'Album creation';

  this.album_form = function() {
    console.log(this.albumForm)
    if (!this.albumForm || !this.albumForm.title)
    return ;
    console.log("yop");
    $http.post('/albums/newAlbum', this.albumForm)
    .then(function() {
      $location.path('/upload');
    });
    this.albumForm = {};
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
.controller('otherProfileController', ["$scope", "$http", "$location", "AuthService", '$routeParams', function($scope, $http, $location, AuthService, $routeParams) {
  var _this = this;
  if (!AuthService.isLoggedIn()) $location.path("/login");
  $scope.main.title = 'Profile';

  this.getUser = function() {
    $http.get('/users/userprofile/'+ $routeParams.id)
    .then(function(res) {
      _this.user = res.data;
    });
  };

  this.getUser();

  this.getUsers = function() {
    $http.get('/users/allusers')
    .then(function(res) {
      _this.listOthers = res.data;
    });
  };

  this.getUsers();

  this.getUserMessages = function() {
    $http.get('/messages/usermessages/'+ $routeParams.id)
    .then(function(res) {
      _this.messages = res.data;
    });
  };

  this.getUserMessages();


  this.sendMessage = function() {
    if (!this.newmsg || !this.newmsg.text)
    return ;
    $http.post('/messages/messages/'+ $routeParams.id, this.newmsg)
    .then(function() {
      _this.getUserMessages();
    });
    this.newmsg = {};
  };

  this.getAlbums = function() {
    $http.get('/albums/albums/'+ $routeParams.id)
    .then(function(res) {
      _this.listAlbums = res.data;
    });
  };

  this.getAlbums();


}])
.uploadController('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {username: $scope.username, file: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
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
    if ($scope.registerForm.password != $scope.registerForm.password_confirmation) {
      $scope.error = true;
      $scope.errorMessage = "Password and password confirmation don't match.";
      $scope.disabled = false;
    }
    else {
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
    }
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
