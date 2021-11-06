const Flight = require('../models/Flight');

const createFlight = (req,res)=>{
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
      ToAirport: req.body.ToAirport,
      Terminal: req.body.Terminal

   })
   newFlight.save()
   .then((newFlight)=>{res.send(newFlight)})
   .catch((err)=>{console.log(err)});
}

const showFlights = (req,res)=>{
   Flight.find({},(err,flights)=>{
      
      res.send(flights);
   })
};

const showFlightbyID = (req,res)=>{
   let id = req.params.id;
   Flight.findById(id, (err,flight)=>{
      if(err){
         console.log(err);
      }
      else{
         res.send(flight);
      }
   })
}

const filterFlights = (req,res)=>{
   const bodyArr = Object.entries(req.body);
   const filtered = bodyArr.filter(([key,value]) => value !== '');
   const bodyObj = Object.fromEntries(filtered);

   if(req.body.Departure !== ''){
      let dep = new Date(`March 13, 08 ${req.body.Departure}`);
      dep = getTime(dep);
      bodyObj.Departure = dep;
   }

   if(req.body.Arrival !== ''){
      let arr = new Date(`March 13, 08 ${req.body.Arrival}`);  
      arr = getTime(arr);
      bodyObj.Arrival = arr;
   }
   Flight.find(bodyObj,(err,flights)=>{
     //res.render('showFlights',{flights: flights})
     res.send(flights);
   })
}

const findReturnFlights = async (req,res)=>{
   const id = req.params.id;
   const depFlight = await Flight.findById(id);
   const flightDate = depFlight.FlightDate;
   const flightArrHour = Number.parseInt(depFlight.Arrival.AsString.split(':')[0]);
   const flightArrMin = Number.parseInt(depFlight.Arrival.AsString.split(':')[1]);
   const newDep = depFlight.ToAirport;
   const newRet = depFlight.FromAirport;
   let possibleFlights = await Flight.find({FromAirport: newDep, ToAirport: newRet});

   //Gets all Return Flights in later day
   let returnFlights= possibleFlights.filter((flight)=>(
      flight.FlightDate.getTime() > flightDate.getTime()
   ))

   //Gets all Return Flights in later hour
   let returnFlights2= possibleFlights.filter((flight)=>(
      flight.FlightDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) > flightArrHour
   ));

   //Gets all Return Flights in later minute
   let returnFlights3 = possibleFlights.filter((flight)=>(
      flight.FlightDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) == flightArrHour
   )).filter((flight)=>(
      Number.parseInt(flight.Departure.AsString.split(':')[1]) > flightArrMin
   ))

   //Merges all Return Flights
   returnFlights.concat(returnFlights2).concat(returnFlights3);

   res.send(returnFlights);
}

const deleteFlight = (req,res)=>{
   const id = req.params.id;
   Flight.findByIdAndDelete(id, (err, deleted) => {  
      if (err) 
        console.log(err);
      else {
        console.log(`Deleted: ${deleted}`);
        res.send('Deleted: ' + deleted);
      }
    });
}

const updateFlight = (req, res) => {
   try{
      let arr = new Date(`${req.body.FlightDate}T${req.body.Arrival}:00`);
      let dep = new Date(`${req.body.FlightDate}T${req.body.Departure}:00`);  
      const updatedFlight = {
         FlightNumber: req.body.FlightNumber,
         Departure: getTime(dep),
         Arrival: getTime(arr),
         FlightDate: req.body.FlightDate,
         EconomySeats: req.body.EconomySeats,
         BusinessSeats: req.body.BusinessSeats,
         FirstClassSeats: req.body.FirstClassSeats,
         FromAirport: req.body.FromAirport,
         ToAirport: req.body.ToAirport,
         Terminal: req.body.Terminal
      };
      Flight.findByIdAndUpdate(req.params.id, updatedFlight,(err, flight)=> {
         if(err){
            console.log(err);
            return res.json({message : err});
         }
         else{
            return res.send(flight);
         }
      })
   }
   catch(err){
      console.log(err);
   }
}

const showSchedule = async(req,res)=>{
    const flights = await Flight.find({});
    sortByDate(flights);
    res.send(flights);
}


function getTime(time){
   const Period = time.getHours() >= 12 ? 'PM' : 'AM';
   let Hours = time.getHours();
      if(Period === 'PM' && time.getHours() != 12)
         Hours = time.getHours() - 12 + '';
      else if(Period === 'AM' && time.getHours() === 0)
         Hours = '12';
   Hours = Hours < 10 ? '0' + Hours : Hours;
   Minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()+'',
   Time = {
      Hours: Hours,
      Minutes: Minutes,
      Period: Period
   }
   Time.AsString = getTimeString(Time);
   return Time;

}

function sortByTime(flights){
    for(i = 0;i < flights.length-1; i++){
      if(+flights[i].FlightDate==+flights[i+1].FlightDate){ 
        var h1,h2=0; 
        if(flights[i].Departure.Period=='PM' && flights[i].Departure.Hours!=12){
            h1= flights[i].Departure.Hours+12;
        }
        else{
            h1=flights[i].Departure.Hours;
        }
        
        if(flights[i+1].Departure.Period=='PM' && flights[i+1].Departure.Hours!=12){
            h2= flights[i+1].Departure.Hours+12;
        }
        else{
            h2=flights[i+1].Departure.Hours;
        }
        var d1 = new Date(flights[i].FlightDate.getFullYear(), flights[i].FlightDate.getMonth(), flights[i].FlightDate.getDate(), h1,flights[i].Departure.Minutes);
        var d2 = new Date(flights[i+1].FlightDate.getFullYear(), flights[i+1].FlightDate.getMonth(), flights[i+1].FlightDate.getDate(), h2,flights[i+1].Departure.Minutes);
        if (d1>d2){
            var temp = flights[i];
            flights[i] = flights[i+1];
            flights[i+1] = temp;
        }
      }                  
   } 
}

function getTimeString(time){
   let hrs = time.Hours;
   if(time.Period === 'PM' && time.Hours !== 12){
     hrs = (Number.parseInt(time.Hours) + 12) + '';
   }
   else if(time.Period === 'AM' && time.Hours == 12){
      hrs = '00';
   }
   return `${hrs}:${time.Minutes}`;
}

function sortByDate(arr){
    arr.sort((a,b)=> new Date(a.FlightDate) - new Date(b.FlightDate));
    sortByTime(arr);
}


module.exports = {
    createFlight,
    showFlights,
    showFlightbyID,
    filterFlights,
    deleteFlight,
    updateFlight,
    showSchedule,
    getTime,
    findReturnFlights
}