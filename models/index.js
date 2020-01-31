const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/concertVAULT';

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

module.exports = {
  User: require('./User'),
  Concert: require('./Concert')
};