var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var db = require(path.join(appRoot, "server", "models", "db.js"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


function usersReadAll (req, res, err) {
  User.find( function(err, users) {
    (err ? res.send(err) : res.json(users));
  });
}

function usersShowOne (req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id);
  User.find({_id: id}, function(err, user) {
    (err ? res.send(err) : res.json(user));
  });
}

function usersUpdateOne (req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id);
  if (req.user.id == req.params.id) {
    User.find({_id: id}, function(err, messages) {
      (err ? res.send(err) : res.json(messages));
    });
  }
  else {
    res.status(500).send({errorMsg: "You don't have right to do this"})
  }
}

function usersDeleteOne (req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id);
  if (req.user.id == req.params.id) {
    User.remove({_id: id}, function(err) {
        (err ? res.send(err) : res.status(200).send());
    });
  }
  else {
    res.status(500).send({errorMsg: "You don't have right to do this"})
  }
}

function addFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
    var idfriend = mongoose.Types.ObjectId(req.params.id);
  User.update({"_id": id}, {$push: {"friend": idfriend}}, function (err) {
    (err ? res.send(err) : res.status(200).send());
  });
}

function unFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  var idfriend = mongoose.Types.ObjectId(req.user.id);
  User.update({"_id": id}, {$pull: {"friend": idfriend}}, function (err) {
    (err ? res.send(err) : res.status(200).send());
  });
}

module.exports.usersReadAll = usersReadAll;
module.exports.usersUpdateOne = usersUpdateOne;
module.exports.usersDeleteOne = usersDeleteOne;
module.exports.usersShowOne = usersShowOne;
