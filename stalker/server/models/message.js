var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');
var User = require(path.join(appRoot, "server", "models", "user.js"));

module.exports = mongoose.model('message', {
    text: { type: String, default: '', required: true },
    createdAt: {type: Date, default: Date.now, required: true},
    authorId: {type: Schema.Types.ObjectId, required: true, ref: 'user' },
    wallId:{type: Schema.Types.ObjectId, required: true, ref: 'user' },
    updatedAt:{type: Date, default: ''}
});
