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

function usersAskFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  User.aggregate([{$lookup: {from: "users", localField: "_id", foreignField: "askFriends", as: "asking"}}, {$match: { "asking._id": id }}], function (err, asking) {
    (err ? res.send(err) : res.json(asking));
    });
}

function usersFindFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  User.aggregate([{$lookup: {from: "users", localField: "_id", foreignField: "friends", as: "friendlings"}}, {$match: { "friendlings._id": id }}], function (err, friendlings) {
      (err ? res.send(err) : res.json(friendlings));
    });
}

function usersShowOne (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  User.findOne({_id: id}, function(err, user) {
    (err ? res.send(err) : res.json(user));
  });
}

function usersUpdateOne (req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id);
  if (req.user.id == req.params.id) {
    User.update({_id: id}, {username: req.body.username, email: req.body.email, firstname: req.body.firstname,
       lastname: req.body.lastname, address: req.body.address}, function(err) {
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

function askFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
    var idfriend = mongoose.Types.ObjectId(req.params.id);
  User.update({"_id": id}, {$push: {"askFriends": idfriend}}, function (err) {
    (err ? res.send(err) : res.status(200).send());
  });
}

function addFriend (req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
    var idfriend = mongoose.Types.ObjectId(req.params.id);
  User.update({"_id": id}, {$push: {"friends": idfriend}}, function (err) {
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
module.exports.usersAskFriend = usersAskFriend;
module.exports.usersFindFriend = usersFindFriend;
module.exports.askFriend = askFriend;
module.exports.addFriend = addFriend;
module.exports.usersUpdateOne = usersUpdateOne;
module.exports.usersDeleteOne = usersDeleteOne;
module.exports.usersShowOne = usersShowOne;
