const { getDb } = require('../db/connect');

const getAllAuthors = async () => {
  const db = getDb();
  const authors = await db.collection('authors').find({}).toArray();
  return authors;
};

const getAuthorById = async (id) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id });
  return author;
};

const createAuthor = async (author) => {
  const db = getDb();
  const result = await db.collection('authors').insertOne(author);
  return result;
};

const updateAuthor = async (id, author) => {
  const db = getDb();
  const result = await db.collection('authors').replaceOne({ id }, author);
  return result;
};

const deleteAuthor = async (id) => {
  const db = getDb();
  const result = await db.collection('authors').deleteOne({ id });
  return result;
};

// Helper to check if an author has books before deleting
const authorHasBooks = async (authorId) => {
  const db = getDb();
  const bookCount = await db.collection('books').countDocuments({ authorId });
  return bookCount > 0;
};

module.exports = { 
  getAllAuthors, 
  getAuthorById, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor, 
  authorHasBooks 
};