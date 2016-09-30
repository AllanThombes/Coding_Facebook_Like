var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var Message = require(path.join(appRoot, "server", "models", "message.js"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function readAll(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  console.log(User.friends);
  Message.find({_id:{$in: {User.friends}}}, function(err, msg) {
    console.log(err);
    (err ? res.status(500).send(err) : res.status(200).send(msg));
  });
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
module.exports.createOne = createOne;
module.exports.deleteOne = deleteOne;
