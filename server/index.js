require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require('helmet');
const morgan = require('morgan');

// Helmet helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// HTTP request logging with Morgan
app.use(morgan('tiny'));

const router = require('./app/router');

// Middleware which parses incoming requests with JSON payloads
app.use(express.json());

app.use('/api/', router);

app.listen(PORT, () => {
    console.log(`Server running on : localhost:${PORT}/api/`)
});