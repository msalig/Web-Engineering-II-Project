const mongoose = require('mongoose');
const {Schema} = require("mongoose");

let blogEntrySchema = new Schema({
  authorId: {required: true, type: Schema.Types.ObjectId, ref: 'User'},
  title: {required: true, type: String},
  url: {required: true, type: String, unique: true},
  locationId: {type: Schema.Types.ObjectId, ref: 'Location'},
  text: {required: true, type: String},
  textShort: {required: true, type: String},
  review: {type: Number},
  tags: [{type: String}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('BlogEntry', blogEntrySchema);
