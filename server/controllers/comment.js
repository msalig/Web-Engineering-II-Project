const Joi = require('joi-oid')
const Comment = require('../models/comment');
const BlogEntry = require("../models/blogentry");
const User = require("../models/user");
const mongoose = require("mongoose");

const commentSchema = Joi.object({
  authorId: Joi.objectId().required(),
  blogEntryId: Joi.objectId().required(),
  title: Joi.string().required(),
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
  return Comment.aggregate([{
    $match: {_id: new mongoose.Types.ObjectId(id)}
  }, {
    $lookup: {
      from: "users", localField: "authorId", foreignField: "_id", as: "authors"
    }
  }, {
    $addFields: {
      author: { $arrayElemAt: ["$authors", 0] }    }
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
      author: { $arrayElemAt: ["$authors", 0] }    }
  }, {
    $project: {
      "author.hashedPassword": 0, "author.__v": 0, authors: 0, __v: 0
    }
  }]).exec();
}

async function update(commentId, comment) {
  return Comment.findByIdAndUpdate(commentId, comment, {new: true});
}

async function deleteComment(commentId) {
  return Comment.findByIdAndDelete(commentId);
}
