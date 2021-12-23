const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');
const bookingController = require('../controllers/bookingController');
const User = require('../models/User');

router.post('/availableFlights',flightController.filterFlights);

router.get('/flight/show/:id',flightController.showFlightbyID);

router.post('/flight/viewReservations', userController.viewReservations);

router.post('/flight/cancelReservations', userController.cancelReservation);

router.get('/flight/getArrivalAirport', userController.getArrivalAirport);

router.post('/flight/getArrivalAirport', userController.getArrivalAirport);

router.get('/flight/getDepartureAirport', userController.getDepartureAirport);

router.post('/flight/getDepartureAirport', userController.getDepartureAirport);

router.post('/sendConfirmation', userController.sendEmail);    

router.post('/searchFlights',flightController.searchFlights);

router.post('/createBooking', bookingController.createBooking);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

router.post('/flight/addSeatsCancelled', flightController.addSeats);

router.put('/booking/editSeats', bookingController.editSeats);

router.get('/find/', async (req,res)=>{
    const users = await User.find({})
    res.send(users);
})

router.get('/find/:id', async (req,res)=>{
    const _id = req.params.id;
    const user = await User.findById(_id)
    res.send(user);
})

router.put('/update/:id', (req,res)=>{
    User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Could not update flight'});
        }
        else{
            res.send(user);
        }
       
    })   

});



module.exports = router;