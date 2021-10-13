require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

// Helmet helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// HTTP request logging with Morgan
app.use(morgan('tiny'));

const router = require('./app/router');

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *;  img-src 'self' 'unsafe-inline' 'unsafe-eval' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *"
  );
next();
});

// Middleware which parses incoming requests with JSON payloads
app.use(express.json());

// Priority serve any static files
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Answer API requests
app.use('/api/', router);

// All remaining requests return the React app, so it can handle routing
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on : localhost:${PORT}/api/`)
});