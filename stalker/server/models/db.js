var path = require('path');
var config = require(path.join(appRoot, "server", "config", "config.js"));
var user = require(path.join(appRoot, "server", "models", "user.js"));
var bodyParser = require('body-parser');

var db = config.db.mongodb;

/* Read all user */
function readUser(cb) {
  user.find(function (err, users) {
    console.log(err);
    console.log(users);
    if ( err || users.length == 0) return cb(null);
    cb(users);
  });
}

function updateUser(username, email, pwd, cb) {
  user.update({username: username},{$set:{"username": username, "email": email, "password": pwd}} , function (err, usr) {
    if ( err || usr.length == 0) return cb(null);
    cb(usr);
  });
}

/* Delete user */
function deleteUser(id, cb) {
  user.findByIdAndRemove({"_id": msgid}, function (err, usr) {
    if ( err || usr.length == 0) return cb(null);
    cb(usr);
  });
}

module.exports.readUser = readUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
