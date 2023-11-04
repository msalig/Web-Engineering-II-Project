const express = require('express');
const asyncHandler = require('express-async-handler');
const locationCtrl = require('../controllers/location');

const router = express.Router();

/**
 * @openapi
 * /locations:
 *   post:
 *     summary: Fügt einen neuen Location hinzu
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *     tags:
 *       - location
 *   get:
 *     summary: Ruft alle Locations ab
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *     tags:
 *       - location
 */
router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(read))

module.exports = router;

async function insert(req, res) {
  let location = await locationCtrl.insert(req.body);
  //let blogEntry = await blogEntryCtrl.addComment((await location).blogEntryId, (await location)._id)
  res.json(location);
}

async function read(req, res) {
  let locations = await locationCtrl.read();
  res.json(locations);
}
