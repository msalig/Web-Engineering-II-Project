const Joi = require('joi-oid');
const BlogEntry = require('../models/blogentry');

const blogEntrySchema = Joi.object({
  authorId: Joi.objectId().required(),
  title: Joi.string().required(),
  locationId: Joi.objectId(),
  text: Joi.string().required(),
  textShort: Joi.string().required(),
  review: Joi.number().min(0).max(5),
  tags: Joi.array().items(Joi.string()),
  comments: Joi.array().items(Joi.objectId())
});

module.exports = {
  insert,
  getAll,
  getAllShort,
  getBlogById,
  getBlogsByAuthor,
  getBlogsByTag,
  getBlogsByCountry,
  addComment,
  update,
  deleteBlogEntry
};

async function insert(blogEntry) {
  blogEntry = await blogEntrySchema.validateAsync(blogEntry, {abortEarly: false});
  blogEntry.url = blogEntry.title.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().replaceAll(" ", "-");
  return await new BlogEntry(blogEntry).save();
}

async function getAll() {
  return BlogEntry.find();
}

async function getAllShort() {
  return BlogEntry.find({}, '_id authorId title url locationId textShort review tags');
}

async function getBlogsByTag(tag) {
  return BlogEntry.find({tags: {tag}})
}

async function getBlogsByCountry(country) {
  console.log('Get blogs by country: ' + JSON.stringify(country, undefined, 2));
  return BlogEntry.find({location: {country: country}});
}

async function getBlogById(id) {
  console.log('Get blog by Id: ' + JSON.stringify(id, undefined, 2));
  return BlogEntry.findById(id);
}

async function getBlogsByAuthor(author) {
  return BlogEntry.find({authorId: author});
}

async function addComment(blogID, commentID) {
  return BlogEntry.findOneAndUpdate({_id: blogID}, {$push: {comments: commentID}}, {new: true})
}

async function update(blog) {
  return BlogEntry.findOneAndUpdate({_id: blog.id}, blog);
}

async function deleteBlogEntry(blogEntry) {
  return BlogEntry.findOneAndDelete({email: blogEntry.email});
}
