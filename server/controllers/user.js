const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');
const mongoose = require('mongoose');

const userSchema = Joi.object({
  displayname: Joi.string().required(),
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  hashedPassword: Joi.string()
});

module.exports = {
  create, getAll, getById, update, deleteUser, getByUsername
};

async function create(user) {
  user = await userSchema.validateAsync(user, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function getAll() {
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

async function getById(id) {
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

async function getByUsername(username, withPWD) {
  let agg = User.aggregate([{
    $match: {username: username}
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
      blogEntries: 0, __v: 0
    }
  }]);

  if (!withPWD) {
    agg.project({hashedPassword: 0});
  }

  return agg.exec();
}

async function update(userId, user) {
  return User.findByIdAndUpdate(userId, user, {new: true}).select('-hashedPassword');
}

async function deleteUser(userId) {
  return User.findByIdAndDelete(userId);
}
