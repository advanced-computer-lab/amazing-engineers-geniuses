const User = require('../models/User');

const addBookingtoUser = (newBooking,userId)=>{
    console.log(userId)
    User.findById(userId,(err,user)=>{
        if(err)
            console.log(err);
        else{
            let userBookings = user.Bookings;
            let newBookings = [...userBookings,newBooking]
            User.findByIdAndUpdate(user._id,{Bookings: newBookings},(err,booking)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                else{
                    return booking
                }
            })
        }
    })

   
}

module.exports ={
    addBookingtoUser
}