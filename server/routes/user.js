const express = require('express');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user');
const bcrypt = require("bcrypt");
const HttpStatus = require('http-status-codes');

const router = express.Router();

/**
 * @openapi
 * /users/login:
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
 *       tag:
 *        - user
 */
router.post('/login', asyncHandler(checkUserCred));

/**
 * @openapi
 * /users/{id}:
 *   get:
 *       summary: Get a user by Id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The users Id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *        - user
 *   put:
 *       summary: Update a user by its Id
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The users Id
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
 *       summary: Delete a user by its Id
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The users Id
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
router.route('/:id')
  .get(asyncHandler(read))
  .put(asyncHandler(update))
  .delete(asyncHandler(deleteUser));

/**
 * @openapi
 * /users/byUsername/{username}:
 *   get:
 *       summary: Get a user by its username
 *       parameters:
 *         - name: username
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The users username
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       tags:
 *        - user
 */
router.route('/byUsername/:username')
  .get(asyncHandler(getUserByUsername))

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
  if (user != null) {
    res.status(HttpStatus.CREATED).json(user);
  } else {
    res.status(404).end();
  }
}

async function readAll(req, res) {
  let users = await userCtrl.readAll();
  if(users != null) {
    res.json(users);
  } else {
    res.status(404).end();
  }
}

async function read(req, res) {
  let user = await userCtrl.read(req.params.id);
  if (user != null) {
    res.json(user);
  } else {
    res.status(404).end();
  }
}

async function getUserByUsername(req, res) {
  let user = await userCtrl.getUserByUsername(req.params.username, false);
  if (user[0] != null) {
    res.json(user[0]);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function checkUserCred(req, res) {
  let user = await userCtrl.getUserByUsername(req.body.username, true);
  if (user[0] != null) {
    if (bcrypt.compareSync(req.body.password, user[0].hashedPassword)) {
      user = await userCtrl.getUserByUsername(req.body.username, false);
      res.json(user[0]);
    }
  }
  res.status(HttpStatus.UNAUTHORIZED).json({message: "Invalid Credentials"});
}

async function update(req, res) {
  let user = await userCtrl.update(req.params.id, req.body);
  if(user != null) {
    res.json(user);
  } else {
    res.status(404).end();
  }
}

async function deleteUser(req, res) {
  let user = await userCtrl.deleteUser(req.body.id);
  if(user != null) {
    res.status(HttpStatus.OK).end();
  } else {
    res.status(404).end();
  }
}
