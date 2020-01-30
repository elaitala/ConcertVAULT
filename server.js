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
app.get('/', (request, response) => {
  response.send(`<h1>Welcome to the concertVAULT API</h1>`);
});

// API routes
// DOCUMENTATION route
app.get('/ai/v1', (request, response) => {
  const doc = {
    message: 'Welcome to the concertVAULT API',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1',
        description: 'Describes all available endpoints'
      }
    ]
  };
  response.json(doc);
});

// CONCERT routes
// index
app.get('api/v1/concert', (request, response) => {
  response.json({message: 'Concert INDEX'});
});
// create
app.post('/api/v1/concert', (request, response) => {
  response.json({message: 'Concert CREATE', body: request.body});
});



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