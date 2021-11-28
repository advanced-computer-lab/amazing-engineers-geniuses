const Booking = require('../models/Booking');


const createBooking = async (req,res)=>{
 
    //let price=
    
    const newBooking={
        DepartureFlight:req.body.DepartureFlight,
        ReturnFlight:req.body.ReturnFlight,
        Price:req.body.Price,
        NumberOfSeats:req.body.NumberOfSeats,
        Seat:req.body.Seat,
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
    createBooking
}