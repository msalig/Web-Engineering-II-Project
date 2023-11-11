const express = require('express');
const userRoutes = require('./user');
const blogEntryRoutes = require('./blogentry');
const commentRoutes = require('./comment');
const locationRoutes = require('./location');

const router = express.Router();

/**
 * @openapi
 * /health-check:
 *   get:
 *     description: Returns OK when the service is available.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/users', userRoutes);
router.use('/blogEntries', blogEntryRoutes);
router.use('/comments', commentRoutes);
router.use('/locations', locationRoutes);

module.exports = router;
