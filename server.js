// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
const app = express();

// ----------------------------- INSTANCED modules

// ----------------------------- CONFIGURATION variables
const PORT = 3000;

// ----------------------------- MIDDLEWARE
app.use(bodyParser.json());

// ----------------------------- ROUTES

// VIEW routes

// API routes

// 404 route
app.get('/*', (request, response) => {
  response
    .status(404)
    .send(`<h1>404</h1><h3>You don't have to go home but you can't stay here</h3>`);
});

// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});