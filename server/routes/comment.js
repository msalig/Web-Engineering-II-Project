const express = require('express');
const asyncHandler = require('express-async-handler');
const commentCtrl = require('../controllers/comment');
const blogEntryCtrl = require('../controllers/blogentry');
const HttpStatus = require("http-status-codes");

const router = express.Router();

/**
 * @openapi
 * /comments/byBlogEntry/{id}:
 *    get:
 *       summary: Get an array of comments by BlogEntryId
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
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Comment'
 *       tags:
 *        - comment
 */
router.route('/byBlogEntry/:id')
  .get(asyncHandler(getByBlogEntryId));

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
 *    delete:
 *       summary: Delete a comment by id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *         '404':
 *           description: Not Found
 *       tags:
 *        - comment
 */
router.route('/:id')
  .get(asyncHandler(read))
  .delete(asyncHandler(deleteComment));

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
  .get(asyncHandler(readAll))

module.exports = router;

async function insert(req, res) {
  let comment = await commentCtrl.insert(req.body);
  let blogEntry = await blogEntryCtrl.addComment(comment.blogEntryId, comment._id)
  if(blogEntry != null) {
    res.status(HttpStatus.CREATED).json(comment);
  } else {
    res.status(404).end();
  }
}

async function readAll(req, res) {
  let comments = await commentCtrl.readAll();
  if(comments != null) {
    res.json(comments);
  } else {
    res.status(404).end();
  }
}

async function read(req, res) {
  let comment = await commentCtrl.read(req.params.id);
  if(comment != null) {
    res.json(comment);
  } else {
    res.status(404).end();
  }
}

async function getByBlogEntryId(req, res) {
  let comments = await commentCtrl.getByBlogEntryId(req.params.id);
  if(comments != null) {
    res.json(comments);
  } else {
    res.status(404).end();
  }
}

async function update(req, res) {
  let comment = await commentCtrl.update(req.params.id, req.body);
  if(comment != null) {
    res.json(comment);
  } else {
    res.status(404).end();
  }
}

async function deleteComment(req, res) {
  let comment = await commentCtrl.deleteComment(req.params.id);
  if(comment != null) {
    await blogEntryCtrl.removeComment(comment.blogEntryId, comment.id);
    res.json(comment);
  } else {
    res.status(404).end();
  }
}
