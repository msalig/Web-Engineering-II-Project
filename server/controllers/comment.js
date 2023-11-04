const Joi = require('joi-oid')
const Comment = require('../models/comment');

const commentSchema = Joi.object({
  authorId: Joi.objectId().required(),
  blogEntryId: Joi.objectId().required(),
  text: Joi.string().required(),
  review: Joi.number().min(0).max(5)
});

module.exports = {
  insert, read, update, deleteComment
};

async function insert(comment) {
  comment = await commentSchema.validateAsync(comment, {abortEarly: false});
  return await new Comment(comment).save();
}

async function read() {
  return Comment.find();
}

async function update(user) {

}

async function deleteComment(commentId) {
  return Comment.findByIdAndDelete(commentId);
}
