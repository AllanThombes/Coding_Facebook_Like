var passport = require("passport");
var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));


var db = config.db.mongodb;

function register(req, res, err) {
  User.register(new User({username: req.body.username, email: req.body.email, firstname: req.body.firstname,
     lastname: req.body.lastname, address: req.body.address}), req.body.password, function(err, account) {
    if (err) return res.status(500).json({err: err});

    passport.authenticate('local')(req, res, function(){
      return res.status(200).json({status: "Registration successful!"});
    });
  });
}

function login(req, res, next, err) {
  passport.authenticate('local', function(err, user, info){
    if (err) return next(err);
    if (!user) return res.status(401).json({err: info});

    req.logIn(user, function(err) {
        if (err) return res.status(500).json({err: "Could not log in user"});
        res.status(200).json({status: "Welcome on board, keep your arms in the site during the navigation!"});

    });
  })(req, res, next);
}

module.exports.register = register;
module.exports.login = login;
