const express = require('express');
const router = express.Router();
const db = require('../models');

// Base URL is now localhost:3000/api/v1/concert
// INDEX
router.get('/', (request, response) => {
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
router.post('/', (request, response) => {
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
router.get('/:id', (request, response) => {
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
router.put('/:id', (request, response) => {
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
router.get('/:id/async', async(request, response) => {
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
router.put('/:id', async(request, response) => {
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
router.delete('/:id', (request, response) => {
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

router.put('/:id/venues', async(request, response) => {
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

module.exports = router;