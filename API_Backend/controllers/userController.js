const User = require('../models/User');
const Flights = require('../models/Flight');
const Bookings = require('../models/Booking');
const nodemailer = require("nodemailer");

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

const sendEmail = (req, res) => {
    let userEmail = req.body.email;
    let emailSubject = req.body.emailSubject
    let emailBody = req.body.emailBody

    let transporter = nodemailer.createTransport({
        service:'outlook',
        auth: {
            user: 'amazingairlines@outlook.com',
            pass: '5amazingengineers'
        }
    });
    message = req.body.message

    let mailOptions = {
        from: '"Amazing Air" amazingairlines@outlook.com', // sender address
        to: userEmail, // list of receivers
        subject: emailSubject, // Subject line
        text: emailBody // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return
         
        }
        res.json(info);

    });
}


const viewReservations = (req, res) => {
    // console.log(req.body, "good shit's here")
    userName = "test2";   
    console.log(userName, "ussssseeeerrrrrrrrrrrrr");
    User.find({username : "test2"}).then ( (user) => {
        var BookedArr = [];
        var retrievedBookingsArr = user[0].Bookings;

        retrievedBookingsArr.forEach( (singleBookingId) => {
            BookedArr.push(Bookings.findById(singleBookingId))
        });
        return Promise.all(BookedArr);
    }).then(function(listOfBookings){
        return res.json({listOfBookings});
    }).catch(function(error){
        return res.json({error});
    });

}                          

const getDepartureAirport =  (req, res) =>{
    // console.log(req.body.departureId, "little shit's here");
    const departureId = req.body.departureId;
    // var departureFrom = "";

    Flights.findById(departureId, (err, data) => {
        if(err){
            return res.json({err});
        }
        else{
            const departureAirport = data
            return res.json({departureAirport});
        }
    })
}

const deleteBooking = (req, res) => {
    const bookingId = req.body.bookingId;
    Bookings.deleteOne({ _id : bookingId }).then(function(){
        return res.json({message : "Deleted"}); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
}
    

const getArrivalAirport = (req, res) =>{
    arrivalId = req.body.arrivalId;

    Flights.find({_id : arrivalId}, (err, data) => {
        if(err){
            return res.json({err});
        }
        else{
            const arrivalAirport = data.ToAirport
            // console.log(data);
            return res.json({arrivalAirport});
        }
    })
}

    // await Flights.findById(arrivalId, (err, data) => {
    //     if(err){
    //         return res.json({err});
    //     }
    //     else{
    //         arrivalTo = data.ToAirport;
    //     }
    // })
    // return res.json({departureAirport : departureFrom, arrivalAirport : arrivalTo});
// }


// wanna get id and delete using th

 const cancelReservation =  (req, res) => {
    var reservationsArr = [];
    userName = req.body.username;
    console.log(userName, "useerrrrrr");
    bookingNumber = req.body.bookingNumber
    console.log(bookingNumber, "bookkinunggg")
    let user =  User.findOneAndUpdate({username: userName}, { $pull: {Bookings: bookingNumber} }, (err, data) => {
        if(err){
            return res.json({"error" : err});
        }
        else{
                return res.json({data});
            }

        });  
 

 }


module.exports = {
    viewReservations,
    cancelReservation,
    sendEmail,
    getArrivalAirport,
    getDepartureAirport,
    addBookingtoUser,
    deleteBooking
}