const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  blogEntryId: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogEntry', required: true},
  text: {type: String, required: true},
  review: {type: Number}
});

module.exports = mongoose.model('Comment', commentSchema);
