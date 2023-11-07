const Joi = require('joi-oid')
const Comment = require('../models/comment');
const BlogEntry = require("../models/blogentry");

const commentSchema = Joi.object({
  authorId: Joi.objectId().required(),
  blogEntryId: Joi.objectId().required(),
  text: Joi.string().required(),
  review: Joi.number().min(0).max(5)
});

module.exports = {
  insert, read, readAll, getByBlogEntryId, update, deleteComment
};

async function insert(comment) {
  comment = await commentSchema.validateAsync(comment, {abortEarly: false});
  return await new Comment(comment).save();
}

async function readAll() {
  return Comment.find();
}

async function read(id) {
  return Comment.findById(id);
}

async function getByBlogEntryId(id) {
  return Comment.find({blogEntryId: id});
}

async function update(commentId, comment) {
  return Comment.findByIdAndUpdate(commentId, comment, {new: true});
}

async function deleteComment(commentId) {
  return Comment.findByIdAndDelete(commentId);
}
