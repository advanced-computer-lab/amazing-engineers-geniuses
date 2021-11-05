const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const flightController = require('../controllers/flightController');

// router.use(isAdmin);

router.get('/',(req,res)=>{
   res.send('You admin');
});

router.get('/flight/create', (req,res)=>{
   res.render('createFlight');
    
});

router.post('/flight/create',flightController.createFlight);

router.get('/flight/showFlights',(req,res)=>{
   Flight.find({},(err,flights)=>{
      res.json(flights);
   })
});

router.get('/flight/show',flightController.showFlights)

router.post('/flight/show',flightController.filerFlights);

router.delete('/flight/delete/:id',flightController.deleteFlight);


router.get('/flight/update/:id',(req,res)=>{
   Flight.findById(req.params.id,(err,flight)=>{
      if(err)
         console.log(err);
      else{
         res.render('updateFlight',{flight});
      }
   });
});

router.put('/flight/update/:id', flightController.updateFlight);


function isAdmin(){
   //Admin Verification middleware
}

module.exports = router;