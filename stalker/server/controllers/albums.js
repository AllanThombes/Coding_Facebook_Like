var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var Album = require(path.join(appRoot, "server", "models", "album.js"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function readAll(req, res, err) {var id = mongoose.Types.ObjectId(req.user.id);
  User.findOne({_id: id}, function(err, user) {
    if (err) res.status(500).send(err);
    Album.find({authorId:{$in: user.friends}}, function(err, msg) {
      console.log(msg);
      (err ? res.status(500).send(err) : res.status(200).send(msg));
    });
  });
}


function createOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.user.id);
  Album.create({title: req.body.title, description: req.body.description, authorId: id}, function(err) {
    console.log(err);
      (err ? res.status(500).send(err) : res.status(200).send());
  });
}

function updateOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id)
  Album.findOne({_id: id}, function(err, album) {
    if (err || req.user.id != album.authorId) {
      res.status(500).send(err);
    }
    else
      Album.update({_id: id}, {title: req.body.title, description: req.body.description, updatedAt: Date.now}, function(err) {
        (err ? res.status(500).send(err) : res.status(200).send());
      });
  });
}

function deleteOne(req, res, err) {
  var id = mongoose.Types.ObjectId(req.params.id)
  Album.findOne({_id: id}, function(err, album) {
    if (err || req.user.id != album.authorId) {
      res.status(500).send(err);
    }
    else
      Album.remove({_id: id}, function(err) {
        console.log(err);
        (err ? res.status(500).send(err) : res.status(200).send());
      });
  });
}

module.exports.readAll = readAll;
module.exports.createOne = createOne;
module.exports.deleteOne = deleteOne;
