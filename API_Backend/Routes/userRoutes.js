const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');

router.post('/availableFlights',flightController.filterFlights);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

module.exports = router;