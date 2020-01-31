// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
const db = require('./models');

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
app.get('/api/v1', (request, response) => {
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
app.get('/api/v1/user', (request, response) => {
  db.User.find({}, (error, allUsers) => {
    if (error) {
      // Always RETURN to exit
      return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: allUsers,
      length: allUsers.length,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// CREATE
app.post('/api/v1/user', (request, response) => {
  db.User.create(request.body, (error, createdUser) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: createdUser,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});

// SHOW -> ID === user ID
app.get('/api/v1/user/:id', (request, response) => {
  // response.json({message: 'User SHOW', params: request.params});
  db.User.findById(request.params.id, (error, foundUser) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: foundUser,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// UPDATE -> ID === user ID
// Will receive JSON for update in request.body
app.put('/api/v1/user/:id', (request, response) => {
  // response.json({
  //   message: 'User UPDATE',
  //   params: request.params,
  //   body: request.body
  // });
  db.User.findByIdAndUpdate(
    request.params.id,
    request.body,
    {new: true},
    (error, updatedUser) => {
      if(error) {
        // Always RETURN to exit
        return response
          .status(500)
          .json({message: 'Broke a string, huh?', error: error});
      }
      const responseObj = {
        status: 200,
        data: updatedUser,
        requestedAt: new Date().toLocaleString()
      };
      response.status(200).json(responseObj);
    }
  );
});

// DELETE -> ID === user ID
app.delete('/api/v1/user/:id', (request, response) => {
  // response.json({message: 'USER delete', params: request.params});
  db.User.findByIdAndDelete(request.params.id, (error, deletedUser) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: deletedUser,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });

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