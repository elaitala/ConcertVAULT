const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Venue = require('./Venue');

console.log('CONCERT working...');

const ConcertSchema = new Schema ({
  artist: String,
  date: String,
  venue: String,
  city2: String,
  cityLat: String,
  cityLng: String,
  weather: String,
  concertBuddies: String,
  // 

});

const Concert = mongoose.model('Concert', ConcertSchema);

module.exports = Concert;