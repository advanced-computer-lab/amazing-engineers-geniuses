const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: false
  },
  FirstName: String,
  LastName: String,
  Address: String,
  CountryCode: String,
  Phone:[String],
  Email:{
    type: String,
    uniqure: true
  },
  Passport:String,
  // Reservations:[Reservations]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;