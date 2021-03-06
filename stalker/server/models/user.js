var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
    username: {type: String, index: { unique: true }, required: true},
    email: {type: String, index: { unique: true }, required: true},
    password: {type: String},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    address: {type: String, required: true},
    friends: {type: [Schema.Types.ObjectId]},
    askFriends: {type: [Schema.Types.ObjectId]},
    friendAsk: {type: [Schema.Types.ObjectId]}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);
