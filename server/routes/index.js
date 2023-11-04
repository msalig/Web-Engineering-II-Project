const express = require('express');
const userRoutes = require('./user');
const blogEntryRoutes = require('./blogentry');
const commentRoutes = require('./comment');
const locationRoutes = require('./location');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user');
const bcrypt = require("bcrypt");
//const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * @openapi
 * /health-check:
 *   get:
 *     description: Returns OK when the service is available.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/health-check', (req, res) => res.send('OK'));

//router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/blogEntries', blogEntryRoutes);
router.use('/comments', commentRoutes);
router.use('/locations', locationRoutes);

/**
 * @openapi
 * /login:
 *   post:
 *       summary: Login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Erfolgreiche Anfrage
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '401':
 *           description: Ungültige Anmeldedaten
 */
router.post('/login', asyncHandler(checkUserCred));


async function checkUserCred(req, res) {
  let success = await userCtrl.checkCred(req);
  if (success) {
    res.status(201).json({});
  } else {
    res.status(401).json({message: "Invalid Credentials"});
  }
}


module.exports = router;
