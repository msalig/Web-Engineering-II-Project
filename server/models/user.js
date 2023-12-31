const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    displayname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-z0-9_-]+$/, 'Please enter a valid username']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regex to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model('User', UserSchema);
