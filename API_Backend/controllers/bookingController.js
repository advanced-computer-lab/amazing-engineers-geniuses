const Booking = require('../models/Booking');


const createBooking = async (req,res)=>{
 
    //let TotalCost=(req.body.DepartureFlight.Price + req.body.ReturnFlight.Price)*req.body.NumberOfSeats; based on cabin class
    
    const newBooking={
        DepartureFlight:req.body.DepartureFlight,
        ReturnFlight:req.body.ReturnFlight,
        TotalCost:req.body.Cost,
        NumberOfSeats:req.body.NumberOfSeats,
        Seats:req.body.Seats,
        Cabin:req.body.Cabin,
    }
    Booking.create(newBooking,(err,booking)=>{
        if(err){
            let messageText= 'Sorry,Can not Book this flight... ' +err;
        }
        else{
            res.send(booking);
        }
    })

}

module.exports = {
    createBooking,
}