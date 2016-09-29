var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var Message = require(path.join(appRoot, "server", "models", "message.js"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function readAll(req, res, err) {
  Message.find(function(err, messages) {
    (err ? res.send(err) : res.json(messages));
  });
}

function createOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  Message.create({title: req.body.title, text: req.body.text, authorId: id}, function(err) {
    console.log(err);
      (err ? res.status(500).send(err) : res.status(200).send());
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
