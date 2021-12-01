const Booking = require('../models/Booking');
const flightController = require('./flightController');
const userController = require('./userController');


const createBooking =(req,res)=>{
 
    const newBooking={
        DepartureFlight:req.body.DepartureFlight,
        ReturnFlight:req.body.ReturnFlight,
        TotalCost:req.body.TotalCost,
        NumberOfPassengers:req.body.NumberOfPassengers,
        KidPassengers:req.body.KidPassengers,
        AdultPassengers:req.body.AdultPassengers,
        DepSeats:req.body.DepSeats,
        RetSeats:req.body.RetSeats,
        DepCabinClass:req.body.DepCabinClass,
        RetCabinClass:req.body.RetCabinClass,
    }

    Booking.create(newBooking,(err,booking)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log('here',booking)
            userController.addBookingtoUser(booking, req.body.UserId);
            flightController.updateSeats(booking.DepartureFlight, booking.DepSeats);
            flightController.updateSeats(booking.ReturnFlight, booking.RetSeats);
            res.send(booking);
        }
    })

}

module.exports = {
    createBooking,
}