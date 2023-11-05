const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');
const mongoose = require('mongoose');

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
  return User.aggregate([{
    $lookup: {
      from: "blogentries", localField: "_id", foreignField: "authorId", as: "blogEntries"
    }
  }, {
    $addFields: {
      countBlogEntries: {$size: "$blogEntries"}
    }
  }, {
    $project: {
      blogEntries: 0, email: 0, hashedPassword: 0, __v: 0
    }
  }]).exec();
}

async function read(id) {
  return User.aggregate([{
    $match: {_id: new mongoose.Types.ObjectId(id)}
  }, {
    $lookup: {
      from: "blogentries", localField: "_id", foreignField: "authorId", as: "blogEntries"
    }
  }, {
    $addFields: {
      countBlogEntries: {$size: "$blogEntries"}
    }
  }, {
    $project: {
      blogEntries: 0, hashedPassword: 0, __v: 0
    }
  }]).exec();
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
  return User.findByIdAndUpdate(userId, user, {new: true}).select('-hashedPassword');
}

async function deleteUser(userId) {
  return User.findByIdAndDelete(userId);
}
