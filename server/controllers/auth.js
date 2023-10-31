const config = require('../config/config');
const passport = require('../config/passport');
const User = require('../models/user');
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
  secret: config.jwtSecret, algorithms: ["HS256"], userProperty: 'payload'
});

module.exports = {
  register, login, logout, auth
};

function register(req, res) {
  let user = new User({
    fullname: req.body.fullname, username: req.body.username, email: req.body.email
  });

  user.setPassword(req.body.password);

  user.save().then(() => {
    let token = user.generateJwt();

    res.status(200);
    res.json({
      "token": token
    });
  });
}

function login(res, req) {
  passport.authenticate('local', undefined, (err, user, info) => {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}
