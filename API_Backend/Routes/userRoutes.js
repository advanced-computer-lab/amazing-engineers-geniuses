const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');
const bookingController = require('../controllers/bookingController');

router.post('/availableFlights',flightController.filterFlights);
router.post('/searchFlights',flightController.searchFlights);
router.post('/createBooking', bookingController.createBooking);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

module.exports = router;