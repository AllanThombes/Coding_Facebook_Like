var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var db = require(path.join(appRoot, "server", "models", "db.js"));
var bodyParser = require('body-parser');


function usersReadAll (req, res, err) {
  User.find(function(err, messages) {
    (err ? res.send(err) : res.json(messages));
  });
}

function usersShowOne (req, res, err) {
  User.find({_id: req.params.id}, function(err, messages) {
    (err ? res.send(err) : res.json(messages));
  });
}

function usersUpdateOne (req, res, err) {
  User.find({_id: req.params.id}, function(err, messages) {
    (err ? res.send(err) : res.json(messages));
  });
}

function usersDeleteOne (req, res, err) {
  User.remove({_id: req.params.id}, function(err) {
      (err ? res.send(err) : res.status(200).send());
  });
}


module.exports.usersReadAll = usersReadAll;
module.exports.usersUpdateOne = usersUpdateOne;
module.exports.usersDeleteOne = usersDeleteOne;
module.exports.usersShowOne = usersShowOne;
