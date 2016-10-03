var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('album', {
    title: { type: String, default: '', required: true },
    description: { type: String, default: ''},
    pictures: { type:[String] },
    createdAt: {type: Date, default: Date.now, required: true},
    authorId: {type: Schema.Types.ObjectId, required: true},
    updatedAt:{type: Date, default: ''}
});
