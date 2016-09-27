var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");
var ctrlAuth = require(path.join(appRoot, "server", "controllers", "authentication.js"));

var User = require(path.join(appRoot, "server", "models", "user.js"));

router.post("/user/register", function(req, res){
  ctrlAuth.register(req, res);
});

router.post("/user/login", function(req, res, next) {
  ctrlAuth.login(req, res, next);
});

router.get('/user/logout', function(req, res){
    req.logout();
    res.status(200).json({status: "Requiescat in Pace!"});
});

router.get('/user/status', function(req, res) {
    if (!req.isAuthenticated()) {
	return res.status(200).json({
	    status: false
	});
    }
    res.status(200).json({
	status: true
    });
});

/* User */
router.get('/users', function(req, res, next) {
  ctrlUsers.usersReadAll(req, res);
});
router.put('/users/:userid', function(req, res, next) {
  ctrlUsers.usersUpdateOne(req, res);
});
router.delete('/users/:userid', function(req, res, next) {
  ctrlUsers.usersDeleteOne(req, res);
});
router.get('/profile', function(req, res, next) {
  ctrlUsers.usersShowOne(req, res);
});
router.post('/listfollow', function(req, res, next) {
  ctrlUsers.userListFollow(req, res);
});
router.post('/listblock', function(req, res, next) {
  ctrlUsers.userListBlock(req, res);
});

/* GET home page. */
router.get('*', function(req, res, next) {
    res.status(200).sendFile(path.join(appRoot, "client", "index.html"));
});

module.exports = router;
