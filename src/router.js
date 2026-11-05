const express = require('express');
const router = express.Router();
const { getBooksHandler, getBookByIdHandler } = require('./controllers/books');

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);

module.exports = router;