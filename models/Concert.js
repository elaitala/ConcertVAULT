const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('CONCERT working...');

const ConcertSchema = new Schema ({
  date: String,
  venue: String,
  setlist: String,
  weather: String,
  friends: String
  // 

});

const Concert = mongoose.model('Concert', ConcertSchema);

module.exports = Concert;