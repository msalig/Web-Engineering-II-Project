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
 *           description: Successful login
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '401':
 *           description: UNAUTHORIZED
 *       tag:
 *        - user
 */
router.post('/login', asyncHandler(login));

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
 *         '404':
 *            description: NOT FOUND
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
 *         '404':
 *            description: NOT FOUND
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
 *         '404':
 *            description: NOT FOUND
 *       tags:
 *         - user
 */
router.route('/:id')
  .get(asyncHandler(getById))
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
 *         '404':
 *            description: NOT FOUND
 *       tags:
 *        - user
 */
router.route('/byUsername/:username')
  .get(asyncHandler(getUserByUsername))

/**
 * @openapi
 * /users:
 *   post:
 *       summary: Create a new user (register)
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '201':
 *           description: CREATED
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '400':
 *            description: BAD REQUEST
 *       tags:
 *         - user
 *   get:
 *       summary: Get all users
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *         '400':
 *            description: BAD REQUEST
 *       tags:
 *         - user
 */
router.route('/')
  .post(asyncHandler(create))
  .get(asyncHandler(getAll));

module.exports = router;

async function create(req, res) {
  let user = await userCtrl.create(req.body);
  if (user != null) {
    res.status(HttpStatus.CREATED).json(user);
  } else {
    res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getAll(req, res) {
  let users = await userCtrl.getAll();
  if(users != null) {
    res.json(users);
  } else {
    res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getById(req, res) {
  let user = await userCtrl.getById(req.params.id);
  if (user != null) {
    res.json(user);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getUserByUsername(req, res) {
  let user = await userCtrl.getByUsername(req.params.username, false);
  if (user[0] != null) {
    res.json(user[0]);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function login(req, res) {
  let user = await userCtrl.getByUsername(req.body.username, true);
  if (user[0] != null) {
    if (bcrypt.compareSync(req.body.password, user[0].hashedPassword)) {
      user = await userCtrl.getByUsername(req.body.username, false);
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
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function deleteUser(req, res) {
  let user = await userCtrl.deleteUser(req.body.id);
  if(user != null) {
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}
