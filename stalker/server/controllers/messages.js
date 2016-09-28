var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var Message = require(path.join(appRoot, "server", "models", "message.js"));
var db = require(path.join(appRoot, "server", "models", "db.js"));
var bodyParser = require('body-parser');

function readAll(req, res, err) {
  Message.find(function(err, messages) {
    (err ? res.send(err) : res.json(messages));
  });
}

function createOne(req, res, err) {
  Message.create(req.body, function(err) {
      (err ? res.send(err) : res.status(200).send());
  });
}

function deleteOne(req, res, err) {
  Message.remove({_id: req.params.id}, function(err) {
      (err ? res.send(err) : res.status(200).send());
  });
}

module.exports.readAll = readAll;
module.exports.createOne = createOne;
module.exports.deleteOne = deleteOne;
