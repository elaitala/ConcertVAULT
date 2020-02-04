// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// ----------------------------- INTERNAL modules

const db = require('./models');
const routes = require('./routes');
const utils = require('./middleware/utils');
// const formatter = require('./middleware/formatter');

// ----------------------------- INSTANCED modules
const app = express();

// ----------------------------- CONFIGURATION variables
const PORT = 3000;

// ----------------------------- MIDDLEWARE
app.use(bodyParser.json());

// Express SESSION
app.use(session({
  secret: process.env.SESSION_SECRET || 'qwertyuiop',
  resave: false,
  saveUninitialized: false,
}));

// logger
app.use(utils.logger);
// formatter
// app.use(formatter);

// Serves the PUBLIC folder
app.use(express.static(__dirname + '/public'));

// ----------------------------- ROUTES

// VIEW routes
app.use('/', routes.views);

// API routes

app.post('/api/v1/register', async(request, response) => {
  const userData = request.body;
  let hash;

  try {
    hash = await bcrypt.hashSync(request.body.password, 10);

    userData.passwrod = hash;
  } catch (err) {
    return res.status(400).json({status: 400, error:'Bummer, dude!'});
  }

  db.User.create(userData, (err, newUser) => {
    if (err) return response.status(400).json({error: 'Bummer, dude!'});

    response.status(200).json({status: 200, newUser});
  });
});

app.post('/api/v1/login', (request, response) => {
  // Find user by EMAIL and compare the USER PW on record with supplied PW
  // IF match, send SUCCESS, else send ERROR

  // Pull USER data out of REQUEST
  const {name, email, password} = request.body;

  db.User.findOne({name}, async (err, foundUser) => {
    let passwordsMatch;
    
    if (err) return response.status(400).json({error: 'Bummer, dude!'});

    try {
      passwordsMatch = await bcrypt.compare(password, foundUser.passwoord);
    } catch (err) {
      if(err) return response.status(400).json({error: err});
    }    

    
    if (passwordsMatch) {
      response.status(200).json({status: 200, message: 'Rock on with your bad self!'});
    } else {
    response.status(400).json({status: 400, error: 'Dude, is this a fake ID?'});
    }
  }); 
});

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

// 404 route
app.get('/*', utils.notFound);


// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});