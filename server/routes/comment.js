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
  .get(asyncHandler(getCommentById))
  .delete(asyncHandler(deleteComment));

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Creates a new comment
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
 *     summary: Returns all comments
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
  .post(asyncHandler(create))
  .get(asyncHandler(getAllComments))

module.exports = router;

async function create(req, res) {
  let comment = await commentCtrl.create(req.body);
  let blogEntry = await blogEntryCtrl.addComment(comment.blogEntryId, comment._id)
  if(blogEntry != null) {
    res.status(HttpStatus.CREATED).json(comment);
  } else {
    res.status(404).end();
  }
}

async function getAllComments(req, res) {
  let comments = await commentCtrl.getAll();
  if(comments != null) {
    res.json(comments);
  } else {
    res.status(404).end();
  }
}

async function getCommentById(req, res) {
  let comment = await commentCtrl.getById(req.params.id);
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

async function deleteComment(req, res) {
  let comment = await commentCtrl.deleteComment(req.params.id);
  if(comment != null) {
    await blogEntryCtrl.removeComment(comment.blogEntryId, comment.id);
    res.json(comment);
  } else {
    res.status(404).end();
  }
}
