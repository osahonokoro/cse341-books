const express = require('express');
const router = express.Router();
const { 
  getBooksHandler, 
  getBookByIdHandler,
  createBook,
  updateBook,
  deleteBook
} = require('./controllers/books');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('./controllers/authors');

// --- BOOK ROUTES ---

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book object
 *       404:
 *         description: Book not found
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, authorId, title, publicationDate]
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: New Book Title
 *               publicationDate:
 *                 type: string
 *                 example: "2026-01-15"
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Missing fields, duplicate id, or invalid authorId
 */
router.post('/books', createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [authorId, title, publicationDate]
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a2
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 example: "2026-02-20"
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Missing fields or invalid authorId
 *       404:
 *         description: Book not found
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete('/books/:id', deleteBook);

// --- AUTHOR ROUTES ---

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The author object
 *       404:
 *         description: Author not found
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, name, birthYear]
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthYear:
 *                 type: integer
 *                 example: 1980
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Missing fields or duplicate id
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, birthYear]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               birthYear:
 *                 type: integer
 *                 example: 1990
 *     responses:
 *       200:
 *         description: Author updated
 *       404:
 *         description: Author not found
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 *       400:
 *         description: Cannot delete author with existing books
 *       404:
 *         description: Author not found
 */
router.delete('/authors/:id', deleteAuthor);

module.exports = router;