const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, function (username, password, done) {
  User.findOne({email: username}, function (err, user) {
    if (err) {
      return done(err);
    }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
});

passport.use("local", localLogin);

module.exports = passport;
