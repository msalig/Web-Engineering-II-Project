const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');
const BlogEntry = require("../models/blogentry");

const userSchema = Joi.object({
  displayname: Joi.string().required(),
  username: Joi.string().required().length(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().length(5),
  hashedPassword: Joi.string()
});

module.exports = {
  insert, readAll, read, update, deleteUser, getUserByUsername
};

async function insert(user) {
  user = await userSchema.validateAsync(user, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function readAll() {
  return User.find({}, '_id displayname username'); //+Count BlogEntries
}

async function read(id) {
  return User.findById(id, '-hashedPassword');
}

async function getUserByUsername(username, withPWD) {
  let projection;
  if (!withPWD) {
    projection = '-hashedPassword'
  } else {
    projection = undefined
  }
  return User.findOne({username: username}, projection);
}

async function update(userId, user) {
  return User.findByIdAndUpdate(userId, user, {new:true}).select('-hashedPassword');
}

async function deleteUser(userId) {
  return User.findByIdAndDelete(userId);
}
