const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('USER working...');

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;