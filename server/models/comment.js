const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  review: { type: Number }
});

module.exports = mongoose.model('Comment', commentSchema);
