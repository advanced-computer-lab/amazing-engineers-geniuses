const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Time = new Schema({
    Hours: String,
    Minutes: String,
    Period: {
        type: String,
        enum: ['AM', 'PM']
    },
    AsString: String
},{ _id : false })

const SeatList = new Schema({
    Econ:[String],
    Bus:[String],
    First:[String],
    Available:[String]
},{ _id : false })



const flightSchema = new Schema({
    //as flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
    FlightNumber:{
        type:Number,
        unique: true,
        required: true,
        min: 0  
    },
    Departure:{
        type: Time,
        required: true
    },
    Arrival:{
        type: Time,
        required: true
    },
    DepDate:{
        type:Date,
        required: true
    },
    ArrDate:{
        type:Date,
        required: true
    },
    EconomySeats:{
        type:Number,
        required:true,
        min: 0
    },
    BusinessSeats:{
        type:Number,
        required:true,
        min: 0
    },
    FirstClassSeats:{
        type:Number,
        required:true,
        min: 0
    },
    FromAirport:{
        type:String,
        required:true
    },
    ToAirport:{
        type:String,
        required:true
    },
    Terminal:{
        type: Number,
        required: true,
        min: 1
    },
    SeatsList:{
        type:SeatList,
        required: false
    },

    BaggageAllowance:{
        type:Number,
        required: true,
        min: 0  
    },

    EconPrice:{
        type:Number,
        required:true,
        min: 0
    },
    FirstPrice:{
        type:Number,
        required:true,
        min: 0
    },
    BusPrice:{
        type:Number,
        required:true,
        min: 0
    },
    Duration:{
        type:string,
        required:true,
        min: 0

    },

})

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
