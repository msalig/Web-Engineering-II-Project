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
  getByUrl: getBlogByUrl,
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
  return BlogEntry.find({location: {country: country}});
}

async function getBlogById(id) {
  return BlogEntry.findById(id);
}

async function getBlogsByAuthor(username) {
  let user = await require('../controllers/user').getUserByUsername(username, false);
  return BlogEntry.find({authorId: user.id});
}

async function getBlogByUrl(url) {
  return BlogEntry.findOne({url: url});
}

async function addComment(blogEntryId, commentId) {
  return BlogEntry.findOneAndUpdate(blogEntryId.id, {$push: {comments: commentId}}, {new: true})
}

async function update(blogEntryId, blogEntry) {
  return BlogEntry.findByIdAndUpdate(blogEntryId, blogEntry, {new:true});
}

async function deleteBlogEntry(blogEntryId) {
  return BlogEntry.findByIdAndDelete(blogEntryId);
}
