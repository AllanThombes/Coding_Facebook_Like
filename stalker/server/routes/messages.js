var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");

var ctrlMsgs = require(path.join(appRoot, "server", "controllers", "messages.js"));

/* messages */
router.get('/messages', function(req, res) {
    ctrlMsgs.readAll(req, res);
});
router.get('/usermessages/:id', function(req, res) {
    ctrlMsgs.readUserAll(req, res);
});
router.post('/messages/:id', function(req, res) {
    ctrlMsgs.createOne(req, res);
});
router.post('/messages', function(req, res) {
    ctrlMsgs.createOne(req, res);
});
router.delete('/messages/:id', function(req, res) {
    ctrlMsgs.deleteOne(req, res);
});

module.exports = router;
