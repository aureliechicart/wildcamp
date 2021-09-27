require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
// Helmet helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
const helmet = require('helmet');

app.use(helmet());

const router = require('./app/router');

// Middleware which parses incoming requests with JSON payloads
app.use(express.json());

app.use('/api/', router);

app.listen(PORT, () => {
    console.log(`Server running on : localhost:${PORT}/api/`)
});