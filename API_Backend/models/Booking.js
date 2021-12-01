const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

  NumberOfSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  Seats: {
    type: [String],
    required: true,
  },
  Cabin: {
    type: String,
    required: true,
  },
});
const Booking = mongoose.model('Booking',bookingSchema );
module.exports = Booking;