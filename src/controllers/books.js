const {
  getAllBooks,
  getBookById: getBookByIdFromDb,
  createBook: createBookInDb,
  updateBook: updateBookInDb,
  deleteBook: deleteBookFromDb,
  authorExists
} = require('../models/books');

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookByIdFromDb(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'Missing required fields: id, authorId, title, publicationDate' });
    }

    const bookExists = await getBookByIdFromDb(id);
    if (bookExists) {
      return res.status(400).json({ message: 'Book with this id already exists' });
    }

    const validAuthor = await authorExists(authorId);
    if (!validAuthor) {
      return res.status(400).json({ message: 'Invalid authorId: Author does not exist' });
    }

    const newBook = { id, authorId, title, publicationDate };
    await createBookInDb(newBook);
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body;
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'Missing required fields: authorId, title, publicationDate' });
    }

    const existingBook = await getBookByIdFromDb(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const validAuthor = await authorExists(authorId);
    if (!validAuthor) {
      return res.status(400).json({ message: 'Invalid authorId: Author does not exist' });
    }

    const updatedBook = { id: req.params.id, authorId, title, publicationDate };
    await updateBookInDb(req.params.id, updatedBook);
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const existingBook = await getBookByIdFromDb(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await deleteBookFromDb(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getBooksHandler,
  getBookByIdHandler,
  createBook,
  updateBook,
  deleteBook
};