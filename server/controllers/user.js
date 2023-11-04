const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user');

const userSchema = Joi.object({
  displayname: Joi.string().required(),
  username: Joi.string().required().length(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().length(5),
  hashedPassword: Joi.string()
});

module.exports = {
  insert, read, update, deleteUser
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

async function update(user) {

}

async function deleteUser(user) {
  return User.deleteOne({ email: user.email});
}
