var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");

var User = require(path.join(appRoot, "server", "models", "user.js"));
var ctrlUsers = require(path.join(appRoot, "server", "controllers", "users.js"));

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
router.get('/userprofile', function(req, res, next) {
  ctrlUsers.usersShowOne(req, res);
});
router.get('/listfriend', function(req, res, next) {
  ctrlUsers.usersFindFriend(req, res);
});
router.get('/listasking', function(req, res, next) {
  ctrlUsers.usersAskFriend(req, res);
});
router.get('/user/askfriend/:id', function(req, res, next) {
  ctrlUsers.askfriend(req, res);
});
router.get('/user/addfriend/:id', function(req, res, next) {
  ctrlUsers.addfriend(req, res);
});
router.get('/user/removefriend/:id', function(req, res, next) {
  ctrlUsers.unFriend(req, res);
});

module.exports = router;
