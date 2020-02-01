const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('VENUE working...');

const VenueSchema = new Schema({
  name: String,
  city: String,
  coordinates: String,
  capacity: Number
});

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;