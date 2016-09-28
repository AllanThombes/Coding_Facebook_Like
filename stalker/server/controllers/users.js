var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var User = require(path.join(appRoot, "server", "models", "user.js"));
var db = require(path.join(appRoot, "server", "models", "db.js"));
var bodyParser = require('body-parser');


function usersReadAll (req, res, err) {
  if(!err) {
    db.readUser( function (users){
      if (users){
        res.status(200).json(users);
      }
      else
        res.status(404).json({errorMsg: "Everybody has disapear..."});
    });
  }
  else {
    res.status(404).json({errorMsg: "Lost in the road tu users..."});
  }
}

function usersShowOne (req, res, err) {
  if(!err) {
    if (!req.session.email)
      res.status(404).send({errorMsg: "Must be logged"});
    else
      db.findUser(req.session.id,  function (user) {
        if (user)
          res.status(200).send({users: user});
        else
          res.status(404).send({errorMsg: "This user is a lie"});
      });
  }
  else
    res.status(404).send({errorMsg: "Lost in the road tu user."});
}

function usersUpdateOne (req, res, err) {
  if(!err) {
    if (!req.body.username || !req.body.email || !req.body.password)
      res.status(400).send({errorMsg: "All fields required"});
    else
      db.updateUser(req.params.userid, req.body.username, req.body.email, req.body.password, function (user) {
        if (user)
          res.status(200).send({users: user});
        else
          res.status(404).send({errorMsg: "Update has failed"});
      });
  }
  else
    res.status(404).send({errorMsg: "Lost in the road tu user update."});
}

function usersDeleteOne (req, res, err) {
  if(!err) {
    if (!isNaN(req.params.userid))
      db.deleteUser(req.params.userid, function (user) {
        if (user)
          res.status(200).send({users: user});
          else
            res.status(404).send({errorMsg: "You can't delete that."});
      });
  }
  else {
    res.status(404).send({errorMsg: "Lost in the road tu user delete."});
  }
}

function userListFollow (req, res, err) {
  db.findFollowed(req.body.userid, function (following){
    if (following)
      res.status(200).send({following: following});
    else {
      res.status(200).send();
    }
  });
}

function userListBlock (req, res, err) {
  db.findBlocked(req.body.userid, function (blocking){
    if (blocking)
      res.status(200).send({blocking: blocking});
    else {
      res.status(200).send();
    }
  });
}


module.exports.usersReadAll = usersReadAll;
module.exports.usersUpdateOne = usersUpdateOne;
module.exports.usersDeleteOne = usersDeleteOne;
module.exports.usersShowOne = usersShowOne;
module.exports.userListFollow = userListFollow;
module.exports.userListBlock = userListBlock;
