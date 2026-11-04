const express = require('express');
const router = express.Router();
const { getBooksHandler } = require('./controllers/books');

router.get('/books', getBooksHandler);

module.exports = router;