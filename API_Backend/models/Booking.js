const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flight = require('./Flight');

const bookingSchema = new Schema({
    DepartureFlight: Flight,
    ReturnFlight: Flight,

     price:{
        type:Number,
        required:true,
        min: 0
     },
    
    NumberOfSeats:{
        type:Number,
        required:true,
        min:1,
    },
    Seat:{
        type:string,
        required:true,
        min: 0
    },
    Cabin:{
        type:string,
        required:true,
        min: 0
    }


})
const Booking = mongoose.model('Booking',bookingSchema );
module.exports = Booking;