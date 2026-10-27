import express from 'express';

const app = express();

// Lets the app read JSON sent in request bodies
app.use(express.json());

// Root route: returns a short JSON message
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Books API' });
});

export default app;