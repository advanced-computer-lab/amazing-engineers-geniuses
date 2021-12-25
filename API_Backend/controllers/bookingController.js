const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
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

const editSeats = async(req, res)=>{
    //const oldChosen = req.body.oldChosen;
    const newChosen = req.body.newChosen;
    let flight = req.body.flight;
    let booking = req.body.booking;
    let type = req.body.type;
    let tempAvailable = [...flight.SeatsList.Available];
    tempAvailable = tempAvailable.filter((seat)=>{
        return newChosen.indexOf(seat) === -1
    });
    // console.log(tempAvailable);
    let result = await sortSeatList(tempAvailable);
    console.log(result);
    let editedSeatsList = {
            ...flight.SeatsList,
            Available: result
        };
    
    let updatedFlight = await Flight.findByIdAndUpdate(flight._id,{SeatsList: editedSeatsList});
    
    let updateBooking = {}
    if(type === 'Dep')
        updatedBooking = await Booking.findByIdAndUpdate(booking._id,{DepSeats: newChosen});
    else if(type === 'Ret')
         updatedBooking = await Booking.findByIdAndUpdate(booking._id,{RetSeats: newChosen});

    res.send({updatedBooking, updatedFlight});
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

const editBooking = async(req, res)=>{
    //let booking = req.body.booking;
    let bookingInfo=req.body.bookingInfo;
    let oldBookingInfo= req.body.oldBookingInfo;
    //console.log(bookingInfo.DepartureFlight);
    bookingInfo={
        ...bookingInfo,
        DepartureFlight: bookingInfo.DepartureFlight._id ,
        ReturnFlight: bookingInfo.ReturnFlight._id ,
    }
    let updatedBooking = await Booking.findByIdAndUpdate(bookingInfo._id,bookingInfo);
     
    // if(bookingInfo.DepartureFlight != oldBookingInfo.DepartureFlight){
    //     console.log("CHANGING DEPARTURE FLIGHT");
    //     let oldFlight = await Flight.findById(oldBookingInfo.DepartureFlight);
    //     let oldFlightAvailable = oldFlight.SeatsList.Available;
    //     oldFlightAvailable = [...oldFlightAvailable,...oldBookingInfo.DepSeats];

    //     let oldFlightSeatList = {
    //         ...oldFlight.SeatsList,
    //         Available: oldFlightAvailable
    //     }

    //     let updatedOldFlight = await Flight.findByIdAndUpdate(oldBookingInfo.DepartureFlight,{SeatsList: oldFlightSeatList});


    //     let newFlight = await Flight.findById(bookingInfo.DepartureFlight);
    //     const newChosen= bookingInfo.DepSeats;

    //     let tempAvailable = [...newFlight.SeatsList.Available];
    //     tempAvailable = tempAvailable.filter((seat)=>{
    //         return newChosen.indexOf(seat) === -1
    //     });

    //     let result = await sortSeatList(tempAvailable);

    //     let editedSeatsList = {
    //             ...newFlight.SeatsList,
    //             Available: await sortSeatList(tempAvailable)
    //         };
        
            
    //     console.log("editedSeatsList----------------");
    //     console.log(editedSeatsList);   
       
    //     let updatedNewFlight= Flight.findByIdAndUpdate(bookingInfo.DepartureFlight,{SeatsList: {editedSeatsList}});
    //     // },(err,flight)=>{
    //     //     if(err){
    //     //         console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrerererererererer')
    //     //         console.log(err)
    //     //     }
               
    //     //     else
    //     //     {
    //     //         console.log("---------flight",flight)
    //     //         updatedNewFlight = flight;
    //     //         res.send('hellooo')
    //     //     }
           
    //     // })
        
  
    // }

    // if(bookingInfo.ReturnFlight != oldBookingInfo.ReturnFlight){
    //     let oldFlight = await Flight.findById(oldBookingInfo.ReturnFlight);
    //     let oldFlightAvailable = oldFlight.SeatsList.Available;
    //     oldFlightAvailable = [...oldFlightAvailable,...oldBookingInfo.RetSeats];

    //     let oldFlightSeatList = {
    //         ...oldFlight.SeatsList,
    //         Available: oldFlightAvailable
    //     }

    //     let updatedOldFlight = await Flight.findByIdAndUpdate(oldBookingInfo.ReturnFlight,{SeatsList: oldFlightSeatList});

    //     let newFlight = await Flight.findById(bookingInfo.ReturnFlight);
    //     const newChosen= bookingInfo.RetSeats;
    //     let tempAvailable = [...newFlight.SeatsList.Available];
    //     tempAvailable = tempAvailable.filter((seat)=>{
    //         return newChosen.indexOf(seat) === -1
    //     });
    //     let result = await sortSeatList(tempAvailable);
    //     let editedSeatsList = {
    //             ...newFlight.SeatsList,
    //             Available: result
    //         };
    //     let updatedNewFlight = await Flight.findByIdAndUpdate(bookingInfo.ReturnFlight,{SeatsList: editedSeatsList});
    //   //res.send({updatedBooking,updatedNewFlight });
    // }

    res.send({updatedBooking});
}


module.exports = {
    createBooking,
    editSeats,
    editBooking
}