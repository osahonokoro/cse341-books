const { getDb } = require('../db/connect');

const getAllBooks = async () => {
  const db = getDb();
  const books = await db.collection('books').find({}).toArray();
  return books;
};

module.exports = { getAllBooks };