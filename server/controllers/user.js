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
  insert, readAll, read, update, deleteUser, checkCred
};

async function insert(user) {
  user = await userSchema.validateAsync(user, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function readAll() {
  return User.find({}, '_id displayname username '); //+Count BlogEntries
}

async function read(id) {
  return User.findById(id);
}

async function checkCred(req) {
  let user =  User.findOne({ username: req.body.username }, {lean: true});
  return bcrypt.compareSync(req.body.password, user.hashedPassword);
}

async function update(user) {

}

async function deleteUser(user) {
  return User.deleteOne({ email: user.email});
}
