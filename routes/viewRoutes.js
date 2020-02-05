const express = require('express');
const router = express.Router();
const path = require('path');

// Base URL is now localhost:3000/

console.log('viewROUTES is connected...');

// PUBLIC folder serve
// router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (request, response) => {
  console.log('Getting the API...');
  response.send(`<h1>Welcome to the concertVAULT API</h1>`);
});

// router.get('/documentation', (request, response) => {
//   response.sendFile(__dirname + '/views/documentation.html');
// });

// router.get('/index', (request, response) => {
//   console.log('Getting the INDEX...');
//   response.sendFile(__dirname + '../views/index.html');
// });

// Root (Home/Signup) Template
router.get('/index', (request, response) => {
  console.log('Getting the INDEX...');
  response.sendFile('/views/index.html', {
    root: `${__dirname}/../`
  });
});

// GET LOGIN Template
router.get('/login', (request, response) => {
  console.log('Getting the LOGIN...');
  response.sendFile('/views/login.html', {
    root: `${__dirname}/../`
  });
});

// GET PROFILE Template
router.get('/profile', (request, response) => {
  console.log('Getting the PROFILE...');
  response.sendFile('/views/profile.html', {
    root: `${__dirname}/../`
  });
});

// GET SIGNUP Template
router.get('/signup', (request, response) => {
  console.log('Getting the SIGNUP...');
  response.sendFile('/views/signup.html', {
    root: `${__dirname}/../`
  });
});

// GET CONCERT Template
router.get('/addconcert', (request, response) => {
  response.sendFile('/views/addconcert.html', {
    root: `${__dirname}/../`
  });
});


module.exports = router;