const { getDb } = require('../db/connect');

const getAllBooks = async () => {
  const db = getDb();
  return await db.collection('books').find({}).toArray();
};

const getBookById = async (id) => {
  const db = getDb();
  return await db.collection('books').findOne({ id });
};

const createBook = async (book) => {
  const db = getDb();
  return await db.collection('books').insertOne(book);
};

const updateBook = async (id, book) => {
  const db = getDb();
  return await db.collection('books').replaceOne({ id }, book);
};

const deleteBook = async (id) => {
  const db = getDb();
  return await db.collection('books').deleteOne({ id });
};

const authorExists = async (authorId) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id: authorId });
  return author !== null;
};

module.exports = { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook, 
  authorExists 
};