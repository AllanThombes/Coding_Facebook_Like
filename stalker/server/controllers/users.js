var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var db = require(path.join(appRoot, "server", "models", "db.js"));
var bodyParser = require('body-parser');


function usersReadAll (req, res, err) {
  User.find( function(err, users) {
    (err ? res.send(err) : res.json(users));
  });
}

function usersShowOne (req, res, err) {
  User.find({_id: req.params.id}, function(err, user) {
    (err ? res.send(err) : res.json(user));
  });
}

function usersUpdateOne (req, res, err) {
  if (req.user.id == req.params.id) {
    User.find({_id: req.params.id}, function(err, messages) {
      (err ? res.send(err) : res.json(messages));
    });
  }
  else {
    res.status(500).send({errorMsg: "You don't have right to do this"})
  }
}

function usersDeleteOne (req, res, err) {
  if (req.user.id == req.params.id) {
    User.remove({_id: req.params.id}, function(err) {
        (err ? res.send(err) : res.status(200).send());
    });
  }
  else {
    res.status(500).send({errorMsg: "You don't have right to do this"})
  }
}

function addFriend (req, res, err) {
  User.update({"_id": id}, {$push: {"friend": req.params.friendId}}, function (err) {
    (err ? res.send(err) : res.status(200).send());
  });
}

function unFriend (req, res, err) {
  User.update({"_id": id}, {$pull: {"friend": req.params.friendId}}, function (err) {
    (err ? res.send(err) : res.status(200).send());
  });
}


module.exports.usersReadAll = usersReadAll;
module.exports.usersUpdateOne = usersUpdateOne;
module.exports.usersDeleteOne = usersDeleteOne;
module.exports.usersShowOne = usersShowOne;
