const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
// const bookingController= require('../controllers/bookingController');

router.get('/flightSchedule',flightController.showSchedule);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

router.post('/filterFlights', flightController.filterFlights);

// router.post('/createBooking',bookingController.createBooking);

module.exports = router;
