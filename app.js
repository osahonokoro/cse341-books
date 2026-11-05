const express = require('express');
const app = express();
const router = require('./src/router'); // <-- Add this

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Books API is running');
});

app.use(router); // <-- Add this

module.exports = app;