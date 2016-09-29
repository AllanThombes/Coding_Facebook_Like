var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('message', {
    title: { type: String, default: '', required: true },
    text: { type: String, default: '', required: true },
    createdAt: {type: Date, default: Date.now, required: true},
    authorId: {type: Schema.Types.ObjectId, required: true}
});
