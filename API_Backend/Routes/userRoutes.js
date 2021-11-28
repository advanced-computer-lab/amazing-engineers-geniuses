const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');

router.post('/availableFlights',flightController.filterFlights);


module.exports = router;