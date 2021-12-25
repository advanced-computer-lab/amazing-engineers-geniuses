const User = require('../models/User');
const Flights = require('../models/Flight');
const Bookings = require('../models/Booking');
const stripe = require('stripe')("sk_test_51K9XNPDekJuw28LwrhDVtMgQrOhYG6rTMLSTMs3YpfxBkd8uxfKgPrfoDAQv3NDQjtpvi6DtrOqzDBMRzZINgTbz00pcx4ykdi");
const nodemailer = require("nodemailer");
const Flight = require('../models/Flight');
const uuid = require('uuid').v4

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
            user: 'amazingairlines1@outlook.com',
            pass: '5amazingengineers'
        }
    });
    message = req.body.message

    let mailOptions = {
        from: '"Amazing Air" amazingairlines1@outlook.com', // sender address
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


    const cancelSingleFlight = async (req, res)=>{
        userName = req.body.username;
        console.log(userName, "usee");
        bookingNumber = req.body.bookingNumber;
        console.log(bookingNumber, "booking");
        canceledFlightId = req.body.canceledId;
        canceledType = req.body.canceledType;
        if(canceledType == "returning"){
            let booking = await Bookings.findByIdAndUpdate(req.body.bookingNumber,{ReturnFlight: null});
            console.log("ret deletedddd");

           let newRetAv =  [...req.body.RetList.Available, ...req.body.RetSeats];
            let x = await sortSeatList(newRetAv);
            // console.log('sortedList ',x);

            newRetSeats = {
                ...req.body.RetList,
                Available: x
            
    }

    console.log('newRetSeats',newRetSeats);
    let retFlight = await Flight.findByIdAndUpdate(req.body.RetId,{SeatsList: newRetSeats});
             return res.json({deletedFlight : canceledFlightId});
        }
        else{
            let booking = await Bookings.findByIdAndUpdate(req.body.bookingNumber,{DepartureFlight: null});
            console.log("ret deletedddd");
            let newDepAv = [...req.body.DepList.Available, ...req.body.DepSeats];
            let y = await sortSeatList(newDepAv);

            let newDepSeats = {
                ...req.body.DepList,
                Available: y
            }
            let depFlight = await Flight.findByIdAndUpdate( req.body.DepId,{SeatsList: newDepSeats});
            return res.json({deletedFlight : canceledFlightId});
        }
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

const payment = async (req, res)=>{
    const product = req.body.product;
    const token = req.body.token;
    const price = req.body.price;
    console.log("token", token);
    console.log("product", product);
    // console.log("price", product.price);
    const idempotencyKey = uuid();

    try{
    await stripe.customers.create({
        email: token.email,
        source: token.id
    }).then( async customer => {
        await stripe.charges.create({
            amount: price,
            currency : 'EGP',
            customer : customer.id,
            receipt_email : token.email,
            description: `purchase of ${product.name}`,
        },{idempotencyKey})
    }).then(result => {res.status(200).json(result)});
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
          message: "Payment Failed",
          success: false,
        });
      }
}


module.exports = {
    viewReservations,
    cancelReservation,
    sendEmail,
    getArrivalAirport,
    getDepartureAirport,
    addBookingtoUser,
    deleteBooking,
    cancelSingleFlight,
    payment
}