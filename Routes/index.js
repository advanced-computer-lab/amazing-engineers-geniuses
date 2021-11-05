const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');

router.get('/',(req,res)=>{
    res.render('Login');
})

router.get('/flightSchedule',flightController.showSchedule);

module.exports = router;
