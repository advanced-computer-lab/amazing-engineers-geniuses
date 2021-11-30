const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');

router.post('/availableFlights',flightController.filterFlights);


router.get('/flight/viewReservations', userController.viewReservations);
router.post('/flight/cancelReservations', userController.cancelReservation);
router.post('/sendConfirmation', userController.sendEmail);    

module.exports = router;