const express = require('express');
const router = express.Router();
const db = require('../models');

// Base URL is now localhost:3000/api/v1/user

console.log('userROUTES is connected...');

// INDEX
router.get('/api/v1/user', (request, response) => {
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
router.post('/api/v1/user', (request, response) => {
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
router.get('/api/v1/user/:id', (request, response) => {
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
router.put('/api/v1/user/:id', (request, response) => {
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
router.delete('/api/v1/user/:id', (request, response) => {
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

module.exports = router;