const { MongoClient } = require('mongodb');

let database;

const connectToDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    database = client.db(process.env.MONGODB_DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { connectToDb, getDb };