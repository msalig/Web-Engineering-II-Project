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

/*router.route('/{id}/comments')
  .get(asyncHandler(getBlogComments))
  .post(asyncHandler(insertComment));*/

/**
 * @openapi
 * /blogEntries/{id}:
 *   get:
 *       summary: Get a blog entry by ID
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
 *       summary: Update a blog entry by ID
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
 *       summary: Delete a blog entry by ID
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
  .get(asyncHandler(getBlogByID))
  .put(asyncHandler(updateBlogByID))
  .delete(asyncHandler(deleteBlogByID));

/**
 * @openapi
 * /blogEntries/byAuthor/{author}:
 *   get:
 *       summary: Get blog entries by author
 *       parameters:
 *         - name: author
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
router.get('/byAuthor/:author', asyncHandler(getBlogsByAuthor));

/**
 * @openapi
 * /blogEntries:
 *   post:
 *       summary: Insert a new blog entry
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogEntry'
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/BlogEntry'
 *       tags:
 *        - blogEntries
 *   get:
 *       summary: Get all blog entries
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

async function getBlogByID(req, res) {
  let blogs = await blogEntryCtrl.getBlogByID(req.params.id);
  res.send(blogs);
}

async function getBlogsByAuthor(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByAuthor(req.params.author);
  res.send(blogs);
}

async function updateBlogByID(req, res) {
  let user = await blogEntryCtrl.update(req.params.id);
  res.json(user);
}

async function deleteBlogByID(req, res) {
  let success = await blogEntryCtrl.deleteBlogEntry(req.params.id);
  res.json(success);
}
