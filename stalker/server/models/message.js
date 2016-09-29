var mongoose = require('mongoose');

module.exports = mongoose.model('message', {
    title: { type: String, default: '', required: true },
    text: { type: String, default: '', required: true },
    createdAt: {type: Date, default: Date.now},
    authorId: {type: Number, required: true}
});
