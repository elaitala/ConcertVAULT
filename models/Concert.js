const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Venue = require('./Venue');


console.log('CONCERT working...');

const ConcertSchema = new Schema ({
  date: String,
  venue: [Venue.schema],
  setlist: String,
  weather: String,
  friends: String
  // 

});

const Concert = mongoose.model('Concert', ConcertSchema);

module.exports = Concert;