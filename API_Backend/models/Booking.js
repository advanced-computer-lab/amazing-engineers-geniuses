const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flight = require('../models/Flight');


const bookingSchema = new Schema({
  DepartureFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  }, 

  ReturnFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  }, 

  TotalCost: {
    type: Number,
    required: true,
    min: 0,
  },

  NumberOfPassengers: {
    type: Number,
    required: true,
    min: 1,
  },

  DepSeats: {
    type: [String],
    required: true,
  },

  RetSeats: {
    type: [String],
    required: true,
  },

  CabinClass: {
    type: String,
    required: true,
  },
});
const Booking = mongoose.model('Booking',bookingSchema );
module.exports = Booking;