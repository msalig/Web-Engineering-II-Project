const express = require('express');
const asyncHandler = require('express-async-handler');
const blogEntryCtrl = require('../controllers/blogentry');
const HttpStatus = require('http-status-codes');

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
 *         '404':
 *           description: Not Found
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
  let blog = await blogEntryCtrl.insert(req.body);
  if(blog != null) {
    res.status(HttpStatus.CREATED).json(blog);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getAll(req, res) {
  let blogs = await blogEntryCtrl.getAll();
  if(blogs != null) {
    res.json(blogs);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getAllBlogsShort(req, res) {
  let blogs = await blogEntryCtrl.getAllShort();
  if(blogs != null) {
    res.json(blogs);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getBlogsByTag(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByTag(req.params.tag);
  if(blogs != null) {
    res.json(blogs);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getBlogsByCountry(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByCountry(req.params.country);
  if(blogs != null) {
    res.json(blogs);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getBlogById(req, res) {
  let blog = await blogEntryCtrl.getBlogById(req.params.id);
  if (blog != null) {
    res.json(blog);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getBlogsByAuthor(req, res) {
  let blogs = await blogEntryCtrl.getBlogsByAuthor(req.params.username);
  if (blogs != null) {
    res.json(blogs);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
}

async function getBlogsByUrl(req, res) {
  let blogs = await blogEntryCtrl.getByUrl(req.params.url);
  if (blogs != null) {
    res.json(blogs);
  } else {
    res.status(404).end();
  }
}

async function updateBlog(req, res) {
  let blog = await blogEntryCtrl.update(req.params.id, req.body);
  if (blog != null) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
}

async function deleteBlogById(req, res) {
  await blogEntryCtrl.deleteBlogEntry(req.params.id).then(() => {
    res.status(HttpStatus.OK).end();
  }).catch((error) => {
    res.status(HttpStatus.NOT_FOUND).json(error).end();
  });
}
