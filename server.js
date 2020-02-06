// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const bcrypt = require('bcryptjs');

// ----------------------------- INTERNAL modules

// const db = require('./models');
const routes = require('./routes');
const utils = require('./middleware/utils');
// const formatter = require('./middleware/formatter');

// ----------------------------- INSTANCED modules
const app = express();

// ----------------------------- CONFIGURATION variables
const PORT = process.env.PORT || 3000;

// ----------------------------- MIDDLEWARE
// Serve STATIC assets
app.use(express.static(`${__dirname}/public`));

// BODYPARSER
app.use(bodyParser.json());

// Express SESSION
app.use(session({
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/session-review'
  }),
  secret: process.env.SESSION_SECRET || 'qwertyuiop',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // Cookie good for 2 WEEKS
  },
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
app.use('/api/v1', routes.api);

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