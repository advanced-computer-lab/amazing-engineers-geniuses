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
      // console.log(flights);
      res.render('showFlights',{flights: flights})
   })
})

router.post('/flight/showFlights',(req,res)=>{
   const bodyArr = Object.entries(req.body);
   const filtered = bodyArr.filter(([key,value]) => value !== '');
   const bodyObj = Object.fromEntries(filtered);

   if(req.body.Departure !== ''){
      let dep = new Date(`March 13, 08 ${req.body.Departure}`);
      dep = flightController.getTime(dep);
      bodyObj.Departure = dep;
   }

   if(req.body.Arrival !== ''){
      let arr = new Date(`March 13, 08 ${req.body.Arrival}`);  
      arr = flightController.getTime(arr);
      bodyObj.Arrival = arr;
   }
   console.log(bodyObj);
   Flight.find(bodyObj,(err,flights)=>{
     res.render('showFlights',{flights: flights})
     // res.send(flights);
   })
})

router.get('/flight/show',flightController.showFlights)

router.post('/flight/show',flightController.filterFlights);

router.get('/flight/show/:id',flightController.showFlightbyID);

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