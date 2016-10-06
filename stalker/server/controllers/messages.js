var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var Message = require(path.join(appRoot, "server", "models", "message.js"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function readAll(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  User.findOne({_id: id}, function(err, user) {
    if (err) res.status(500).send(err);
    Message.find({$or: [{authorId:{$in: user.friends}},{authorId: req.user.id}]})
            .populate('authorId','username').sort({createdAt: 'desc'})
            .exec(function(err, msg) {
      (err ? res.status(500).send(err) : res.send(msg));
    });
  });
}

function readUserAll(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  var userid = mongoose.Types.ObjectId(req.params.id);
  User.findOne({_id: id}, {friends: 1}, function(err, user) {
    if (err) res.status(500).send(err);
     for u in user
    Message.find({authorId: userid}, function(err, msg) {
      (err ? res.send(err) : res.send(msg));
    });
  })
}


function createOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  Message.create({text: req.body.text, authorId: id}, function(err) {
    console.log(err);
      (err ? res.status(500).send(err) : res.status(200).send());
  });
}

function updateOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id)
  Message.findOne({_id: id}, function(err, message) {
    if (err || req.user.id != message.authorId) {
      res.status(500).send(err);
    }
    else
      Message.update({_id: id}, {title: req.body.title, text: req.body.text, updatedAt: Date.now}, function(err) {
        (err ? res.status(500).send(err) : res.status(200).send());
      });
  });
}

function deleteOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id)
  Message.findOne({_id: id}, function(err, message) {
    if (err || req.user.id != message.authorId) {
      console.log(message);
      console.log(req.user.id + " "+ message.authorId);
      res.status(500).send(err);
    }
    else
      Message.remove({_id: id}, function(err) {
        console.log(err);
        (err ? res.status(500).send(err) : res.status(200).send());
      });
  });
}

module.exports.readAll = readAll;
module.exports.readUserAll = readUserAll;
module.exports.createOne = createOne;
module.exports.deleteOne = deleteOne;
