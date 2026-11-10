const {
  getAllAuthors: getAllAuthorsFromDb,
  getAuthorById: getAuthorByIdFromDb,
  createAuthor: createAuthorInDb,
  updateAuthor: updateAuthorInDb,
  deleteAuthor: deleteAuthorFromDb,
  authorHasBooks
} = require('../models/authors');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;
    if (!id || !name || birthYear === undefined) {
      return res.status(400).json({ message: 'Missing required fields: id, name, birthYear' });
    }

    const existing = await getAuthorByIdFromDb(id);
    if (existing) {
      return res.status(400).json({ message: 'Author with this id already exists' });
    }

    const newAuthor = { id, name, birthYear };
    await createAuthorInDb(newAuthor);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    if (!name || birthYear === undefined) {
      return res.status(400).json({ message: 'Missing required fields: name, birthYear' });
    }

    const existing = await getAuthorByIdFromDb(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const updatedAuthor = { id: req.params.id, name, birthYear };
    await updateAuthorInDb(req.params.id, updatedAuthor);
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const existing = await getAuthorByIdFromDb(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Prevent deletion if the author still has books
    const hasBooks = await authorHasBooks(req.params.id);
    if (hasBooks) {
      return res.status(400).json({ message: 'Cannot delete author with existing books' });
    }

    await deleteAuthorFromDb(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};