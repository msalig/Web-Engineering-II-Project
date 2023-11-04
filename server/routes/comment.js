const express = require('express');
const asyncHandler = require('express-async-handler');
const commentCtrl = require('../controllers/comment');
const blogEntryCtrl = require('../controllers/blogentry');

const router = express.Router();

/**
 * @openapi
 * /comments/{id}:
 *    get:
 *       summary: Get a comment by Id
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
 *                 $ref: '#/components/schemas/Comment'
 *       tags:
 *        - comment
 */
router.route('/:id')
  .get(asyncHandler(read));

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Fügt einen neuen Kommentar hinzu
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *     tags:
 *       - comment
 *   get:
 *     summary: Ruft alle Kommentare ab
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *     tags:
 *       - comment
 */
router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(read))

module.exports = router;

async function insert(req, res) {
  let comment = await commentCtrl.insert(req.body);
  let blogEntry = await blogEntryCtrl.addComment((await comment).blogEntryId, (await comment)._id)
  res.json(blogEntry);
}

async function readAll(req, res) {
  let comments = await commentCtrl.readAll();
  res.json(comments);
}

async function read(req, res) {
  let comment = await commentCtrl.read(req.body.id);
  res.json(comment);
}

async function update(req, res) {
  let comment = await commentCtrl.update(req.body);
  res.json(comment);
}

async function deleteComment(req, res) {
  let success = await commentCtrl.deleteComment(req.body);
  res.json(success);
}
