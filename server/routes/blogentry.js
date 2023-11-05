const express = require('express');
const asyncHandler = require('express-async-handler');
const blogEntryCtrl = require('../controllers/blogentry');

const router = express.Router();

/**
 * @openapi
 * /blogEntries/short:
 *    get:
 *       summary: Get all blog entries with limited fields
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlogEntryShort'
 *       tags:
 *        - blogEntries
 */
router.get('/short', asyncHandler(getAllBlogsShort));

/**
 * @openapi
 * /blogEntries/byTag/{tag}:
 *   get:
 *      summary: Get blog entries by tag
 *      parameters:
 *         - name: tag
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *      responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlogEntry'
 *      tags:
 *        - blogEntries
 */
router.get('/byTag/:tag', asyncHandler(getBlogsByTag));

/**
 * @openapi
 * /blogEntries/byCountry/{country}:
 *   get:
 *       summary: Get blog entries by country
 *       parameters:
 *         - name: country
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
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlogEntry'
 *       tags:
 *        - blogEntries
 */
router.get('/byCountry/:country', asyncHandler(getBlogsByCountry));

/**
 * @openapi
 * /blogEntries/{id}:
 *   get:
 *       summary: Get a blog entry by Id
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
 *                 $ref: '#/components/schemas/BlogEntry'
 *       tags:
 *        - blogEntries
 *   put:
 *       summary: Update a blog entry by Id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogEntry'
 *       responses:
 *         '200':
 *           description: OK
 *       tags:
 *        - blogEntries
 *   delete:
 *       summary: Delete a blog entry by Id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *       tags:
 *        - blogEntries
 */
router.route('/:id')
  .get(asyncHandler(getBlogById))
  .put(asyncHandler(updateBlog))
  .delete(asyncHandler(deleteBlogById));

/**
 * @openapi
 * /blogEntries/byAuthor/{username}:
 *   get:
 *       summary: Get blog entries by the authors username
 *       parameters:
 *         - name: username
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
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlogEntry'
 *       tags:
 *        - blogEntries
 */
router.get('/byAuthor/:username', asyncHandler(getBlogsByAuthor));

/**
 * @openapi
 * /blogEntries/byUrl/{url}:
 *   get:
 *       summary: Get a blog entry by its url
 *       parameters:
 *         - name: url
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
 *                   $ref: '#/components/schemas/BlogEntry'
 *       tags:
 *        - blogEntries
 */
router.get('/byUrl/:url', asyncHandler(getBlogsByUrl));

/**
 * @openapi
 * /blogEntries:
 *   post:
 *      summary: Insert a new blog entry
 *      requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogEntry'
 *      responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/BlogEntry'
 *      tags:
 *        - blogEntries
 *   get:
 *      summary: Get all blog entries
 *      responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlogEntry'
 *      tags:
 *        - blogEntries
 */
router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(getAll));

module.exports = router;

async function insert(req, res) {
  let blogEntry = await blogEntryCtrl.insert(req.body);
  res.json(blogEntry);
}

async function getAll(req, res) {
  let blogEntries = await blogEntryCtrl.getAll();
  res.json(blogEntries);
}

async function getAllBlogsShort(req, res) {
  let blogs = await blogEntryCtrl.getAllShort();
  res.json(blogs);
}

async function getBlogsByTag(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByTag(req.params.tag);
  res.json(blogs);
}

async function getBlogsByCountry(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByCountry(req.params.country);
  res.send(blogs);
}

async function getBlogById(req, res) {
  let blog = await blogEntryCtrl.getBlogById(req.params.id);
  res.send(blog);
}

async function getBlogsByAuthor(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByAuthor(req.params.username);
  res.send(blogs);
}

async function getBlogsByUrl(req, res) {
  let blogs = await blogEntryCtrl.getByUrl(req.params.url);
  res.send(blogs);
}

async function updateBlog(req, res) {
  let user = await blogEntryCtrl.update(req.params.id, req.body);
  res.json(user);
}

async function deleteBlogById(req, res) {
  let success = await blogEntryCtrl.deleteBlogEntry(req.params.id);
  res.json(success);
}
