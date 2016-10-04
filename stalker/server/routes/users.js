var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");

var User = require(path.join(appRoot, "server", "models", "user.js"));
var ctrlUsers = require(path.join(appRoot, "server", "controllers", "users.js"));

/* User */
router.get('/users', function(req, res, next) {
  ctrlUsers.usersAllOthers(req, res);
});
router.get('/allusers', function(req, res, next) {
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
router.get('/userprofile/:id', function(req, res, next) {
  ctrlUsers.usersShowOne(req, res);
});
router.get('/listfriend', function(req, res, next) {
  ctrlUsers.usersFindFriend(req, res);
});
router.get('/listasking', function(req, res, next) {
  ctrlUsers.usersAskFriend(req, res);
});
router.get('/listasked', function(req, res, next) {
  ctrlUsers.usersFriendAsk(req, res);
});
router.put('/askfriend/:id', function(req, res, next) {
  ctrlUsers.askFriend(req, res);
});
router.put('/rejectask/:id', function(req, res, next) {
  ctrlUsers.reject(req, res);
});
router.put('/addfriend/:id', function(req, res, next) {
  ctrlUsers.addFriend(req, res);
});
router.delete('/removefriend/:id', function(req, res, next) {
  ctrlUsers.unFriend(req, res);
});

module.exports = router;
