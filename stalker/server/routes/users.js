var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");

var User = require(path.join(appRoot, "server", "models", "user.js"));

router.post("/user/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
	if (err) return res.status(500).json({err: err});

	passport.authenticate('local')(req, res, function(){
	    return res.status(200).json({status: "Registration successful!"});
	});
    });
});

router.post("/user/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
	if (err) return next(err);
	if (!user) return res.status(401).json({err: info});

	req.logIn(user, function(err) {
	    if (err) return res.status(500).json({err: "Could not log in user"});
	    res.status(200).json({status: "Welcome on board, keep your arms in the site during the navigation!"});

	});
    })(req, res, next);
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

module.exports = router;
