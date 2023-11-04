const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user');

const router = express.Router();

//router.use(passport.authenticate('jwt', { session: false }));

/**
 * @openapi
 * /users/{id}:
 *   get:
 *       summary: Get a user by ID
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
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *        - blogEntries
 *   put:
 *       summary: Aktualisieren eines Benutzers anhand der ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Die ID des Benutzers
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Erfolgreiche Anfrage
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *         - user
 *   delete:
 *       summary: Löschen eines Benutzers anhand der ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Die ID des Benutzers
 *       responses:
 *         '200':
 *           description: Erfolgreiche Anfrage
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *         - user
 */
router.route('/{id}')
  .get(asyncHandler(read))
  .put(asyncHandler(update))
  .delete(asyncHandler(deleteUser));

/**
 * @openapi
 * /users:
 *   post:
 *       summary: Erstellen eines neuen Benutzers
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Erfolgreiche Anfrage
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *         - user
 *   get:
 *       summary: Alle Benutzer abrufen
 *       responses:
 *         '200':
 *           description: Erfolgreiche Anfrage
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *       tags:
 *         - user
 */
router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(readAll));

module.exports = router;

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function readAll(req, res) {
  let users = await userCtrl.readAll();
  res.json(users);
}

async function read(req, res) {
  let user = await userCtrl.read(req.body.id);
  res.json(user);
}

async function update(req, res) {
  let user = await userCtrl.update(req.body);
  res.json(user);
}

async function deleteUser(req, res) {
  let success = await userCtrl.deleteUser(req.body);
  res.json(success);
}
