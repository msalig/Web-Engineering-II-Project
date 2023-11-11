const Joi = require('joi-oid')
const Comment = require('../models/comment');
const mongoose = require("mongoose");

const commentSchema = Joi.object({
  authorId: Joi.objectId().required(),
  blogEntryId: Joi.objectId().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  review: Joi.number().min(0).max(5)
});

module.exports = {
  create, getById: getById, getAll, getByBlogEntryId, deleteComment
};

async function create(comment) {
  comment = await commentSchema.validateAsync(comment, {abortEarly: false});
  return await new Comment(comment).save();
}

async function getAll() {
  return Comment.find();
}

async function getById(id) {
  return Comment.aggregate([{
    $match: {_id: new mongoose.Types.ObjectId(id)}
  }, {
    $lookup: {
      from: "users", localField: "authorId", foreignField: "_id", as: "authors"
    }
  }, {
    $addFields: {
      author: {$arrayElemAt: ["$authors", 0]}
    }
  }, {
    $project: {
      "author.hashedPassword": 0, "author.__v": 0, "author.email": 0, authors: 0, __v: 0
    }
  }]).exec();
}

async function getByBlogEntryId(id) {
  return Comment.aggregate([{
    $match: {blogEntryId: new mongoose.Types.ObjectId(id)}
  }, {
    $lookup: {
      from: "users", localField: "authorId", foreignField: "_id", as: "authors"
    }
  }, {
    $addFields: {
      author: {$arrayElemAt: ["$authors", 0]}
    }
  }, {
    $project: {
      "author.hashedPassword": 0, "author.__v": 0, authors: 0, __v: 0
    }
  }]).exec();
}

async function deleteComment(commentId) {
  return Comment.findByIdAndDelete(commentId);
}
