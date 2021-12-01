const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');
const bookingController = require('../controllers/bookingController');
const User = require('../models/User');

router.post('/availableFlights',flightController.filterFlights);
router.post('/searchFlights',flightController.searchFlights);
router.post('/createBooking', bookingController.createBooking);

router.get('/findReturnFlights/:id',flightController.findReturnFlights);

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