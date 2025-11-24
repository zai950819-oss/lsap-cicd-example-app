const express = require('express');
const app = express();

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the CI/CD Workshop!');
});

// /time endpoint (from Part 1)
app.get('/time', (req, res) => {
  const now = new Date().toISOString();
  res.json({ time: now });
});

// /health endpoint (for CD Part 2)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
