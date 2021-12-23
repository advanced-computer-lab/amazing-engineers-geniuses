const User = require('../models/User');
const Flights = require('../models/Flight');
const Bookings = require('../models/Booking');
const nodemailer = require("nodemailer");
const Flight = require('../models/Flight');

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
    userName = req.body.username;   
    console.log(userName, "ussssseeeerrrrrrrrrrrrr");
    User.find({username : userName}).then ( (user) => {
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

 const cancelReservation =async (req, res) => {
    userName = req.body.username;
    console.log(userName, "usee");
    bookingNumber = req.body.bookingNumber;
    console.log(bookingNumber, "booking");

    let booking = await Bookings.deleteOne({ _id : bookingNumber }).then(async()=>{
        console.log('booking '+bookingNumber+' deleted');
        let user = await User.findOneAndUpdate({username: userName}, { $pull: {Bookings: bookingNumber} });
    });

    let newDepAv = [...req.body.DepList.Available, ...req.body.DepSeats];
    let y = await sortSeatList(newDepAv);

    let newDepSeats = {
        ...req.body.DepList,
        Available: y
    }
    let depFlight = await Flight.findByIdAndUpdate( req.body.DepId,{SeatsList: newDepSeats});

    // console.log(req.body.RetList.Available);
    // console.log(req.body.RetSeats);
    let newRetAv =  [...req.body.RetList.Available, ...req.body.RetSeats];
    let x = await sortSeatList(newRetAv);
    // console.log('sortedList ',x);

    newRetSeats = {
        ...req.body.RetList,
        Available: x
    }

    console.log('newRetSeats',newRetSeats);
    let retFlight = await Flight.findByIdAndUpdate(req.body.RetId,{SeatsList: newRetSeats});
    // console.log(depFlight)
    // console.log(retFlight);
    res.send({
        booking: booking,
        depFlight: depFlight,
        retFlight: retFlight
    })
};

const editSeats = async(req, res)=>{
    const oldChosen = req.body.oldChosen;
    const newChosen = req.body.newChosen;
    let flight = req.body.flight;
    let tempAvailable = [...flight.SeatsList.Available,...oldChosen];
    tempAvailable = tempAvailable.filter((seat)=>{
        return newChosen.indexOf(seat) === -1
    });
    console.log(tempAvailable);
    let result = sortSeatList(tempAvailable);
    res.send(result);
}


const sortSeatList = async (list)=>{
    let result = [];
    let econlist = list.filter((item)=>{
        return item.charAt(0) === 'E';
    })
    let buslist = list.filter((item)=>{
        return item.charAt(0) === 'B';
    })
    let firstlist = list.filter((item)=>{
        return item.charAt(0) === 'F';
    })

    econlist = sortClassList(econlist);
    buslist = sortClassList(buslist);
    firstlist = sortClassList(firstlist);

    result = [...econlist, ...buslist, ...firstlist];
    return result;
}

const sortClassList = (list)=>{
    let cabin = list[0].charAt(0);
    let listNumbers = list.map((item)=>{
        return parseInt(item.substring(1));
    });
    listNumbers.sort(function(a, b){return a - b});
    let final = listNumbers.map((item)=>{
        return cabin+''+item;
    });
    // console.log('final',final);
    return final;
}



module.exports = {
    viewReservations,
    cancelReservation,
    sendEmail,
    getArrivalAirport,
    getDepartureAirport,
    addBookingtoUser,
    editSeats
}