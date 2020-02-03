const express = require('express');
const router = express.Router();
const path = require('path');

// Base URL is now localhost:3000/

console.log('viewROUTES is connected...');

// PUBLIC folder serve
// router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (request, response) => {
  response.send(`<h1>Welcome to the concertVAULT API</h1>`);
});

router.get('/documentation', (request, response) => {
  response.sendFile(__dirname + '/views/documentation.html');
});

router.get('/index', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// // Root (Home/Signup) Template
// router.get('/', (request, response) => {
//   response.sendFile('/views/index.html', {
//     root: `${__dirname}/../`
//   });
// });

// // GET Login Template
// router.get('/success', (request, response) => {
//   response.sendFile('/views/login.html', {
//     root: `${__dirname}/../`
//   });
// });

// // GET Profile Template
// router.get('/dashboard', (request, response) => {
//   response.sendFile('/views/profile.html', {
//     root: `${__dirname}/../`
//   });
// });


module.exports = router;