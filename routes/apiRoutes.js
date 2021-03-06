const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

// Base URL is now localhost:3000/api/v1/user

console.log('apiROUTES is connected...');


router.post('/user', async(request, response) => {
  const userData = request.body;
  let hash;

  try {
    hash = await bcrypt.hashSync(request.body.password, 10);

    userData.password = hash;
  } catch (err) {
    return response.status(400).json({status: 400, error:'1Bummer, dude!'});
  }

  db.User.create(userData, (err, newUser) => {
    if (err) return response.status(400).json({error: '2Bummer, dude!'});

    response.status(200).json({status: 200, newUser});
  });
});

router.post('/login', (request, response) => {
  // Find user by EMAIL and compare the USER PW on record with supplied PW
  // IF match, send SUCCESS, else send ERROR

  // Pull USER data out of REQUEST
  console.log(request.body);
  const {username, password} = request.body;

  console.log('Inside the PW Compare...');

  db.User.findOne({username}, async (err, foundUser) => {
    let passwordsMatch;
    
    if (err) return response.status(400).json({error: '3Bummer, dude!'});

    try {
      passwordsMatch = await bcrypt.compare(password, foundUser.password);
    } catch (err) {
      if(err) return response.status(400).json({error: err});
    }    

    request.session.currentUser = foundUser._id;
    request.session.createdAt = new Date().toDateString();
    request.session.user = foundUser;

    console.log(request.session);

    // RESPONDS with success if PWs patch
    if (passwordsMatch) {

      response.status(200).json({status: 200, message: 'Rock on with your bad self!'});
    } else {
    response.status(400).json({status: 400, error: 'Dude, is this a fake ID?'});
    }
  }); 
});

// Get PROFILE
router.get('/profile', (request, response) => {
  console.log('Inside PROFILE...');
  
  if (!request.session.currentUser) {
    // return response.status(401).json({message: 'No backstage access!'});
    response.redirect('/login');
  }

  response.sendFile('/views/profile.html', {
    root: `${__dirname}/../`
  });
});

router.get('/api/v1', (request, response) => {
  response.json({message: "Caught in the Views Routes"})
})


// LOGOUT session DELETE
router.get('/logout', (request, response) => {
  console.log('Inside the LOGOUT...');
  
  if (!request.session.currentUser) {
    return response.status(401).json({message: 'No backstage access!'});
  }

  request.session.destroy((err) => {
    if (err) return response.status(400).json({err});
    
    response.json({status: 200});
    // response.redirect('/login');
  });
});

// VERIFY session
router.get('/verify', (request, response) => {
  console.log('Inside the VERIFY...');
  
  if(!request.session.currentUser) {
    return response.status(401).json({error: 'No backstage access!'})
  }
  response.status(200).json(request.session.user);
});

// DOCUMENTATION route
router.get('/', (request, response) => {
  const doc = require('/doc.json');
  response.json(doc);
});

module.exports = router;