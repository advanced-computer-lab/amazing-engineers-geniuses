const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');
const bookingController = require('../controllers/bookingController');

router.post('/availableFlights',flightController.filterFlights);


router.get('/flight/viewReservations', userController.viewReservations);
router.post('/flight/cancelReservations', userController.cancelReservation);
router.get('/flight/getArrivalAirport', userController.getArrivalAirport);
router.post('/flight/getArrivalAirport', userController.getArrivalAirport);

router.get('/flight/getDepartureAirport', userController.getDepartureAirport);
router.post('/flight/getDepartureAirport', userController.getDepartureAirport);
router.post('/sendConfirmation', userController.sendEmail);    
router.post('/searchFlights',flightController.searchFlights);
router.post('/createBooking', bookingController.createBooking);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

module.exports = router;