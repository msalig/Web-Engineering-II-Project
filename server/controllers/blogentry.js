const Joi = require('joi');
const BlogEntry = require('../models/blogentry');
const mongoose = require("mongoose");

/*const blogEntrySchema = Joi.object({
  _id: Joi.object(),
  author: Joi.object(User).required(),
  title: Joi.string().required(),
  location: Joi.object(Location),
  text: Joi.string().required(),
  review: Joi.number().min(0).max(5),
  tags: Joi.array().string(),
  comments: Joi.object < Comment > ().array()
});*/

module.exports = {
  insert,
  getAll,
  getAllShort,
  getBlogByID,
  getBlogsByAuthor,
  getBlogsByTag,
  getBlogsByCountry,
  update,
  deleteBlogEntry
};

async function insert(blogEntry) {
  //blogEntry = await blogEntrySchema.validateAsync(blogEntry, {abortEarly: false});
  return await new BlogEntry(blogEntry).save();
}

async function getAll() {
  return BlogEntry.find();
}

async function getAllShort() {
  return BlogEntry.find({}, '_id author title location text review tags');
}

async function getBlogsByTag(tag) {
  return BlogEntry.find({tags: {tag}})
}

async function getBlogsByCountry(country) {
  console.log('Get blogs by country: ' + JSON.stringify(country, undefined, 2));
  return BlogEntry.find({location: {country: country}});
}

async function getBlogByID(id) {
  console.log('Get blog by ID: ' + JSON.stringify(id, undefined, 2));
  return BlogEntry.findById(id);
}

async function getBlogsByAuthor(author) {
  return BlogEntry.find({authorID: author});
}

async function update(blog) {
  return BlogEntry.updateOne({ id: blog.id});
}

async function deleteBlogEntry(blogEntry) {
  return BlogEntry.deleteOne({email: blogEntry.email});
}
