const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// router.use(isAdmin);

router.get('/',(req,res)=>{
   res.send('You admin');
});

router.get('/flight/create', (req,res)=>{
   res.render('createFlight');
    
});

router.post('/flight/create',(req,res)=>{
   let arr = new Date(`${req.body.FlightDate}T${req.body.Arrival}:00`);
   let dep = new Date(`${req.body.FlightDate}T${req.body.Departure}:00`);  

   const newFlight = new Flight({
      FlightNumber: req.body.FlightNumber,
      Departure: getTime(dep),
      Arrival: getTime(arr),
      FlightDate: req.body.FlightDate,
      EconomySeats: req.body.EconomySeats,
      BusinessSeats: req.body.BusinessSeats,
      FirstClassSeats: req.body.FirstClassSeats,
      FromAirport: req.body.FromAirport,
      ToAirport: req.body.ToAirport

   });
   // const newFlight = new Flight(req.body);
   newFlight.save()
   .then((newFlight)=>{res.send(`Flight ${newFlight.FlightNumber} Created `)})
   .catch((err)=>{res.send(err); console.log(err)});
   

});

router.get('/flight/showFlights',(req,res)=>{
   Flight.find({},(err,flights)=>{
      res.json(flights);
   })
});

router.get('/flight/show',(req,res)=>{
   Flight.find({},(err,flights)=>{
      res.render('showFlights',{flights: flights})
   })
});

router.post('/flight/show',(req,res)=>{
   const bodyArr = Object.entries(req.body);
   const filtered = bodyArr.filter(([key,value]) => value !== '');
   const bodyObj = Object.fromEntries(filtered);

   Flight.find(bodyObj,(err,flights)=>{
      res.render('showFlights',{flights: flights})
   });
});

router.delete('/flight/delete/:id',(req,res)=>{
   const id = req.params.id;
   Flight.findByIdAndDelete(id, (err, deleted) => {  
      if (err) 
        console.log(err);
      else {
        console.log(`Deleted: ${deleted}`);
        //res.send(`Flight ${deleted.FlightNumber} Deleted Succesfuly`);
        res.redirect('/admin/flight/show');
      }
    });
   
});


router.get('/flight/flightSchedule', (req,res)=>{
   Flight.find({},(err,flights)=>{
      res.render('flightSchedule',{flights: flights})
  });
    
});


function getTime(time){
   const Period = time.getHours() >= 12 ? 'PM' : 'AM';
   let Hours = time.getHours();
      if(Period === 'PM' && time.getHours() != 12)
         Hours = time.getHours() - 12;
      else if(Period === 'AM' && time.getHours() === 0)
         Hours = 12;
   Hours = Hours < 10 ? '0' + Hours : Hours;
   Minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()+'',
   Time = {
      Hours: Hours,
      Minutes: Minutes,
      Period: Period
   }
   return Time;

}

function isAdmin(){
   //Admin Verification middleware
}

module.exports = router;