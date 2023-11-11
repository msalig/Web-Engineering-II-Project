const express = require('express');
const asyncHandler = require('express-async-handler');
const locationCtrl = require('../controllers/location');
const HttpStatus = require("http-status-codes");

const router = express.Router();

/**
 * @openapi
 * /locations/{id}:
 *    get:
 *       summary: Get a location by Id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Location'
 *       tags:
 *        - location
 */
router.route('/:id')
  .get(asyncHandler(read));

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
  .get(asyncHandler(readAll))

module.exports = router;

async function insert(req, res) {
  let location = await locationCtrl.insert(req.body);
  if(location != null) {
    res.status(HttpStatus.CREATED).json(location);
  } else {
    res.status(404).end();
  }
}

async function readAll(req, res) {
  let locations = await locationCtrl.readAll();
  if(locations != null) {
    res.json(locations);
  } else {
    res.status(404).end();
  }
}

async function read(req, res) {
  let location = await locationCtrl.read(req.params.id);
  if(location != null) {
    res.json(location);
  } else {
    res.status(404).end();
  }
}
