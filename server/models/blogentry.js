const mongoose = require('mongoose');
const {Schema} = require("mongoose");

let blogEntrySchema = new Schema({
  authorID: {required: true, type: Schema.Types.ObjectId, ref: 'User'},
  title: {required: true, type: String},
  locationID: {type: Schema.Types.ObjectId, ref: 'Location'},
  text: {required: true, type: String},
  review: {type: Number},
  tags: [{type: String}],
  commentIDs: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('BlogEntry', blogEntrySchema);
