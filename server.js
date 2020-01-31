// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
const db = require('./models');
console.log(db.User);

// ----------------------------- INSTANCED modules
const app = express();

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
      },
      {
        method: 'GET',
        path: '/api/v1/user',
        description: 'Responds with JSON of all USER documents'
      }
    ]
  };
  response.json(doc);
});

// USER routes
// INDEX
app.get('api/v1/user', (request, response) => {
  response.json({message: 'User INDEX'});
});
// CREATE
app.post('/api/v1/user', (request, response) => {
  response.json({message: 'User CREATE', body: request.body});
});
// SHOW -> ID === user ID
app.post('/api/v1/user/:id', (request, response) => {
  response.json({message: 'User SHOW', params: request.params});
});
// UPDATE -> ID === user ID
// Will receive JSON for update in request.body
app.put('/api/v1/user/:id', (request, response) => {
  response.json({
    message: 'User UPDATE',
    params: request.params,
    body: request.body
  });
});

// DELETE -> ID === user ID
app.delete('/api/v1/user/:id', (request, response) => {
  response.json({message: 'USER delete', params: request.params});
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