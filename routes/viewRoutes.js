const express = require('express');
const router = express.Router();
const path = require('path');

// Base URL is now localhost:3000/

// PUBLIC folder serve
router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (request, response) => {
  response.send(`<h1>Welcome to the concertVAULT API</h1>`);
});

router.get('/documentation', (request, response) => {
  response.sendFile(__dirname + '/views/documentation.html');
});

module.exports = router;