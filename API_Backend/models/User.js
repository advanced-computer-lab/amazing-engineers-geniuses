const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Booking = require('./Booking');

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
    default: false,
    required: false
  },
  FirstName: {
    type: String,
    default: null
  },
  LastName:  {
    type: String,
    default: null
  },
  Address:  {
    type: String,
    default: null
  },
  CountryCode:  {
    type: String,
    default: null
  },
  Phone:[String],
  Email:{
    type: String,
    unique: true,
    default: null
  },
  Passport: {
    type: String,
    default: null
  },
  
  Bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default:[]
    }]

}, { timestamps: true });

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;