// ----------------------------- EXTERNAL modules
const express = require('express');
const bodyParser = require('body-parser');

// ----------------------------- INTERNAL modules
const app = express();

// ----------------------------- INSTANCED modules

// ----------------------------- CONFIGURATION variables
const PORT = 3000;

// ----------------------------- MIDDLEWARE
app.use(bodyParser.json());

// ----------------------------- ROUTES

// ----------------------------- Start SERVER
app.listen(PORT, () => {
  console.log(`Rocking out on http://localhost:${PORT}`)
});