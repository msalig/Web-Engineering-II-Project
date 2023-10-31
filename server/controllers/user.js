const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  hashedPassword: Joi.string()
});

module.exports = {
  insert, read, readUsername, update, deleteUser
};

async function insert(user) {
  user = await userSchema.validateAsync(user, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function read() {
  return User.find();
}

async function readUsername(username) {
  return User.find({username: username}, 'fullname username email');
}

async function update(user) {

}

async function deleteUser(user) {
  return User.deleteOne({ email: user.email});
}
