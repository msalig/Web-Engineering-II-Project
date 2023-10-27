const express = require('express');
const userRoutes = require('./user');
const blogEntryRoutes = require('./blogentry');
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

module.exports = router;
