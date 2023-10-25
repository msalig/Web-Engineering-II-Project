const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user');

const router = express.Router();

//router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(read))
  .put(asyncHandler(update))
  .delete(asyncHandler(deleteUser));

module.exports = router;

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function read(req, res) {
  let users = await userCtrl.read();
  res.json(users);
}

async function update(req, res) {
  let user = await userCtrl.update(req.body);
  res.json(user);
}

async function deleteUser(req, res) {
  let success = await userCtrl.deleteUser(req.body);
  res.json(success);
}
