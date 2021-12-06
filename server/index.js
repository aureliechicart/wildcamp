require('dotenv').config();

const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const PORT = process.env.PORT || 5000;
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

let options = {
  swaggerDefinition: {
    info: {
      description: 'Wildcamp REST API',
      title: 'Wildcamp API',
      version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    basePath: '/api/',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: [
    './app/router.js',
    './app/models/*.js'
  ] //Path to the API handle folder
};

expressSwagger(options);

// Helmet helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// HTTP request logging with Morgan
app.use(morgan('tiny'));

//Middleware for parsing cookies on incoming requests
app.use(cookieParser());

const router = require('./app/router');

// app.use(function (req, res, next) {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src *;  img-src 'self' 'unsafe-inline' 'unsafe-eval' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *"
//   );
//   next();
// });

// Middleware which parses incoming requests with JSON payloads
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Priority serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

// Answer API requests
app.use('/api/', router);

if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on : localhost:${PORT}/api/`)
});