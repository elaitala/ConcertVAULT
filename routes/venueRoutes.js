const express = require('express');
const router = express.Router();
const db = require('../models');

// Base URL is now localhost:3000/api/v1/venue
// INDEX
router.get('/api/v1/venue', (request, response) => {
  db.Venue.find({})
    .populate('venues')
    .exec((error, allVenues) => {
    if (error) {
      // Always RETURN to exit
      return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: allVenues,
      length: allVenues.length,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// CREATE
router.post('/api/v1/venue', (request, response) => {
  db.Venue.create(request.body, (error, createdVenue) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: createdVenue,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});

// SHOW -> ID === venue ID
router.get('/api/v1/venue/:id', (request, response) => {
  db.Venue.findById(request.params.id)
    .populate('venues')
    .exec((error, foundVenue) => {
    if(error) {
      // Always RETURN
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: foundVenue,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });
});
// UPDATE -> ID === venue ID
// Will receive JSON for update in request.body
router.put('/api/v1/venue/:id', (request, response) => {
  db.Venue.findByIdAndUpdate(
    request.params.id,
    request.body,
    {new: true},
    (error, updatedVenue) => {
      if(error) {
        // Always RETURN to exit
        return response
          .status(500)
          .json({message: 'Broke a string, huh?', error: error});
      }
      const responseObj = {
        status: 200,
        data: updatedVenue,
        requestedAt: new Date().toLocaleString()
      };
      response.status(200).json(responseObj);
    }
  );
});

// SHOW async refactor
router.get('/api/v1/venue/:id/async', async(request, response) => {
  try{
    const foundVenue = await (await db.Venue.findById(request.params.id)).populate(
      'venues'
    );
    const responseObj = {
      status: 200,
      data: foundVenue,
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
router.put('/api/v1/venue/:id', async(request, response) => {
  try{
    const updatedVenue = await db.Venue.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    const responseObj = {
      status: 200,
      data: updatedVenue,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200). json(responseObj);
  } catch (error) {
    return response
      .status(500)
      .json({message: 'Broke a string, huh?', error: error});
  }
});

// DELETE -> ID === venue ID
router.delete('/api/v1/venue/:id', (request, response) => {
  db.Venue.findByIdAndDelete(request.params.id, (error, deletedVenue) => {
    if(error) {
      // Always RETURN to exit
      return response
        .status(500)
        .json({message: 'Broke a string, huh?', error: error});
    }
    const responseObj = {
      status: 200,
      data: deletedVenue,
      requestedAt: new Date().toLocaleString()
    };
    response.status(200).json(responseObj);
  });

});

// VENUE routes
// Updates CONCERT to add VENUE

router.put('/api/v1/venue/:id/venues', async(request, response) => {
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