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
 *         '404':
 *            description: NOT FOUND
 *       tags:
 *        - location
 */
router.route('/:id')
  .get(asyncHandler(getById));

/**
 * @openapi
 * /locations:
 *   post:
 *     summary: Adds a new location
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
 *       '400':
 *          description: BAD REQUEST
 *     tags:
 *       - location
 *   get:
 *     summary: Returns all locations
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       '400':
 *          description: BAD REQUEST
 *     tags:
 *       - location
 */
router.route('/')
  .post(asyncHandler(create))
  .get(asyncHandler(getAll))

module.exports = router;

async function create(req, res) {
  let location = await locationCtrl.create(req.body);
  if(location != null) {
    res.status(HttpStatus.CREATED).json(location);
  } else {
    res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getAll(req, res) {
  let locations = await locationCtrl.getAll();
  if(locations != null) {
    res.json(locations);
  } else {
    res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getById(req, res) {
  let location = await locationCtrl.getById(req.params.id);
  if(location != null) {
    res.json(location);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}
