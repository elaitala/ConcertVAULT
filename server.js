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

// CONCERT routes
// INDEX
app.get('/api/v1/concert', (request, response) => {
  db.Concert.find({})
    .populate('concertGoers')
    .exec((error, allConcerts) => {
    if (error) {
      // Always RETURN to exit
      return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: allConcerts,
      length: allConcerts.length,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// CREATE
app.post('/api/v1/concert', (request, response) => {
  db.Concert.create(request.body, (error, createdConcert) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: createdConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});

// SHOW -> ID === concert ID
app.get('/api/v1/concert/:id', (request, response) => {
  db.Concert.findById(request.params.id)
    .populate('concertGoers')
    .exec((error, foundConcert) => {
    if(error) {
      // Always RETURN
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: foundConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// UPDATE -> ID === concert ID
// Will receive JSON for update in request.body
app.put('/api/v1/concert/:id', (request, response) => {
  db.Concert.findByIdAndUpdate(
    request.params.id,
    request.body,
    {new: true},
    (error, updatedConcert) => {
      if(error) {
        // Always RETURN to exit
        return response
          .status(500)
          .json({message: 'Broke a string, huh?', error: error});
      }
      const responseObj = {
        status: 200,
        data: updatedConcert,
        requestedAt: new Date().toLocaleString()
      };
      response.status(200).json(responseObj);
    }
  );
});

// SHOW async refactor
app.get('/api/v1/concert/:id/async', async(request, response) => {
  try{
    const foundConcert = await (await db.Concert.findById(request.params.id)).populate(
      'concertGoer'
    );
    const responseObj = {
      status: 200,
      data: foundConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  } catch(error) {
    return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
  }
});

// UPDATE async refactor
app.put('/api/v1/concert/:id', async(request, response) => {
  try{
    const updatedConcert = await db.Concert.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    const responseObj = {
      status: 200,
      data: updatedConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200). json(responseObj);
  } catch (error) {
    return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
  }
});

// DELETE -> ID === concert ID
app.delete('/api/v1/concert/:id', (request, response) => {
  db.Concert.findByIdAndDelete(request.params.id, (error, deletedConcert) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: deletedConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });

});

// 405 route
app.use('/api/v1/*', utils.methodNotAllowed);

// 404 route
app.get('/*', utils.notFound);


// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});