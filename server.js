// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
// const db = require('./models');
const routes = require('./routes');
const utils = require('./middleware/utils');

// ----------------------------- INSTANCED modules
const app = express();

// ----------------------------- CONFIGURATION variables
const PORT = 3000;

// ----------------------------- MIDDLEWARE
app.use(bodyParser.json());
// logger
app.use(utils.logger);
// Serves the PUBLIC folder
// app.use(express.static(__dirname + '/public'));

// ----------------------------- ROUTES

// VIEW routes
app.use('/', routes.views);

// API routes
// DOCUMENTATION route
app.get('/api/v1', (request, response) => {
  const doc = require('./doc.json');
  response.json(doc);
});

// USER routes
app.use('/api/v1/user', routes.user);

// CONCERT routes
app.use('/api/v1/concert', routes.concert);

// 405 route
app.use('/api/v1/*', utils.methodNotAllowed);

// 404 route
app.get('/*', utils.notFound);

// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});