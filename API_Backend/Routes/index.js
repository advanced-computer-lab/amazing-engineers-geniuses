const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.get('/flightSchedule',flightController.showSchedule);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

router.post('/filterFlights', flightController.filterFlights);

module.exports = router;
