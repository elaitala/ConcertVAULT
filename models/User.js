const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('USER working...');

// Creates variable to VALIDATE email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'You are not Prince'],
    minlength: [2, 'Dude really? Your name is not that short'],
    maxlength: [50, 'Dude really? Your name is not that long'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: [true, 'Dude, copyright infringement on that email'],
    lowercase: true,
    validate: [validateEmail, 'That is not a real email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'That is not a real email address']
  },
  password: String,
  musicInterests: String,
  concerts: String
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;