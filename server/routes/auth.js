const express = require('express');
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');

const router = express.Router();

// profile
router.get('/profile', authCtrl.auth, userCtrl.read);

// authentication
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);

module.exports = router;
