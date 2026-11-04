require('node:dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const app = require('./app');
const { connectToDb } = require('./src/db/connect');

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();