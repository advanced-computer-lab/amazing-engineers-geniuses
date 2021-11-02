const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Time = new Schema({
    Hours: String,
    Minutes: String,
    Period: {
        type: String,
        enum: ['AM', 'PM']
    }
})

const flightSchema = new Schema({
    //as flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
    FlightNumber:{
        type:Number,
        unique: true,
        required: true    
    },
    Departure:{
        type: Time,
        required: true
    },
    Arrival:{
        type: Time,
        required: true
    },
    FlightDate:{
        type:Date,
        required: true
    },
    EconomySeats:{
        type:Number,
        required:true
    },
    BusinessSeats:{
        type:Number,
        required:true
    },
    FirstClassSeats:{
        type:Number,
        required:true
    },
    FromAirport:{
        type:String,
        required:true
    },
    ToAirport:{
        type:String,
        required:true
    },

})

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
