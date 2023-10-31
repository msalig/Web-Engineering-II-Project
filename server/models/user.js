const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    roles: [
      {
        type: String,
        required: true
      }
    ],
    hashedPassword: String,
    salt: String
  }
);

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: expiry.getTime() / 1000,
  }, config.jwtSecret);
};

module.exports = mongoose.model('User', userSchema);
