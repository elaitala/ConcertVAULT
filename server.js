// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
const db = require('./models');
const utils = require('./middleware/utils');

// ----------------------------- INSTANCED modules
const app = express();

// ----------------------------- CONFIGURATION variables
const PORT = 3000;

// ----------------------------- MIDDLEWARE
app.use(bodyParser.json());
// logger
app.use(utils.logger);

// ----------------------------- ROUTES

// VIEW routes
app.get('/', (request, response) => {
  response.send(`<h1>Welcome to the concertVAULT API</h1>`);
});

// API routes
// DOCUMENTATION route
app.get('/api/v1', (request, response) => {
  const doc = require('./doc.json');
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

// VENUE routes
// Updates CONCERT to add VENUE

app.put('/api/v1/concert/:id/venues', async(request, response) => {
  try{
    const foundConcert = await db.Concert.findById(request.params.id);
    foundConcert.venue.push(request.body);
    foundConcert.save(); //commits changes to DB
    const responseObj = {
      status: 200,
      data: foundConcert,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  } catch (error) {
    return response
    .status(500)
    .json({message: 'Broke a string, huh?', error: error});
  }
});

// 405 route
app.use('/api/v1/*', utils.methodNotAllowed);

// 404 route
app.get('/*', utils.notFound);

// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});