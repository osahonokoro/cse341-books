const { getAllBooks } = require('../models/books');

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getBooksHandler };