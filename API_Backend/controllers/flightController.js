const Flight = require('../models/Flight');
const Booking = require('../models/Booking');


const createFlight = async (req,res)=>{
   const flightsCheck = await Flight.find({FlightNumber: req.body.FlightNumber});
   // if(flightsCheck.size > 0){
   //    res.send()
   // }

   let dep = new Date(`${req.body.DepDate}T${req.body.Departure}:00`);
   let arr = new Date(`${req.body.ArrDate}T${req.body.Arrival}:00`);  

   let seatList = createSeatsList(req.body.EconomySeats, req.body.BusinessSeats, req.body.FirstClassSeats);
   let duration = calcFlightDuration(dep,arr);
   console.log(duration);

   // const KidPrice = {
   //    Econ:req.body.EconPrice,
   //    First:req.body.FirstPrice,
   //    Bus:req.body.BusPrice,

   // }
   const Price = {
      Econ:req.body.EconPrice,
      First:req.body.FirstPrice,
      Bus:req.body.BusPrice,
   }
   
   const Bag = {
     Econ: req.body.EconBag,
     First: req.body.FirstBag,
     Bus: req.body.BusBag,
   }

   const newFlight = {
     FlightNumber: req.body.FlightNumber,
     Departure: getTime(dep),
     Arrival: getTime(arr),
     DepDate: req.body.DepDate,
     ArrDate: req.body.ArrDate,
     EconomySeats: req.body.EconomySeats,
     BusinessSeats: req.body.BusinessSeats,
     FirstClassSeats: req.body.FirstClassSeats,
     FromAirport: req.body.FromAirport.toUpperCase(),
     ToAirport: req.body.ToAirport.toUpperCase(),
     BaggageAllowance: Bag,
     Price: Price,
     Terminal: req.body.Terminal,
     SeatsList: seatList,
     Duration: duration,
   };

   Flight.create(newFlight,(err,flight)=>{
      if(err){
         let messageText ='Error creating flight. ErrorBody: '+err; 
         if(err.code == 11000)
            messageText = `Flight Number ${req.body.FlightNumber} is already taken.`
         res.status(500).send({message: messageText});
      }
      else{
         res.send(flight)
      }
   })

   // newFlight.save()
   // .then((newFlight)=>{res.send(newFlight)})
   // .catch((err)=>{res.send({message: 'Could not create flight'})});
}


const showFlights = (req,res)=>{
   Flight.find({},(err,flights)=>{
      if(err){
         res.status(500).send({message: 'Could not show flights'});
      }
      res.send(flights);
   })
};

const showFlightbyID = (req,res)=>{
   let id = req.params.id;
   Flight.findById(id, (err,flight)=>{
      if(err){
         res.status(500).send({message: 'Could not show flight'});
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

const searchFlights = async (req,res) =>{
   const bodyArr = Object.entries(req.body);
   const filtered = bodyArr.filter(([key,value]) => value !== '' || key !== 'RetDate');
   const bodyObj = Object.fromEntries(filtered);
   // console.log(req.body.RetDate);
   let flights=[];

   flights = await Flight.find(bodyObj);
   // console.log("Flights before RetDate filter",flights)
   flights = flights.filter(async(flight)=>(
           await findReturnFlights(flight,req.body.RetDate).length !== 0
        ))
   // console.log("Flights after RetDate filter",flights)   
   let result = [];
   
   for(const flight of flights){
      returnFlights = await findReturnFlights(flight,req.body.RetDate);
      result = [...result,{DepFlight: flight,ReturnFlights: returnFlights}];
   }

   
   // console.log("result final",result);

   res.send(result);
}

const findReturnFlights2 = async(req, res)=>{
   let depFlight = req.body.depFlight;
   let retDate = req.body.retDate;
   let RetDate = new Date(retDate);
   const flightDate = new Date(depFlight.DepDate);
   const flightArrHour = Number.parseInt(depFlight.Arrival.AsString.split(':')[0]);
   const flightArrMin = Number.parseInt(depFlight.Arrival.AsString.split(':')[1]);
   const newDep = depFlight.ToAirport;
   const newRet = depFlight.FromAirport;
   let possibleFlights = await Flight.find({FromAirport: newDep, ToAirport: newRet});

   //Gets all Return Flights in later day
   let returnFlights= possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() > flightDate.getTime()
   ))

   //Gets all Return Flights in later hour
   let returnFlights2= possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) > flightArrHour
   ));

   //Gets all Return Flights in later minute
   let returnFlights3 = possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) == flightArrHour
   )).filter((flight)=>(
      Number.parseInt(flight.Departure.AsString.split(':')[1]) > flightArrMin
   ))

   //Merges all Return Flights
   returnFlights.concat(returnFlights2).concat(returnFlights3);

   returnFlights = returnFlights.filter((flight) => (flight.ArrDate.getTime() === RetDate.getTime()))

   res.send(returnFlights);
//   console.log('return', returnFlights);
  //return returnFlights
}

const findReturnFlights = async(depFlight, retDate)=>{
   let RetDate = new Date(retDate);
   const flightDate = depFlight.DepDate;
   const flightArrHour = Number.parseInt(depFlight.Arrival.AsString.split(':')[0]);
   const flightArrMin = Number.parseInt(depFlight.Arrival.AsString.split(':')[1]);
   const newDep = depFlight.ToAirport;
   const newRet = depFlight.FromAirport;
   let possibleFlights = await Flight.find({FromAirport: newDep, ToAirport: newRet});

   //Gets all Return Flights in later day
   let returnFlights= possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() > flightDate.getTime()
   ))

   //Gets all Return Flights in later hour
   let returnFlights2= possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) > flightArrHour
   ));

   //Gets all Return Flights in later minute
   let returnFlights3 = possibleFlights.filter((flight)=>(
      flight.DepDate.getTime() == flightDate.getTime()
   )).filter((flight)=>(
     Number.parseInt(flight.Departure.AsString.split(':')[0]) == flightArrHour
   )).filter((flight)=>(
      Number.parseInt(flight.Departure.AsString.split(':')[1]) > flightArrMin
   ))

   //Merges all Return Flights
   returnFlights.concat(returnFlights2).concat(returnFlights3);

   returnFlights = returnFlights.filter((flight) => (flight.ArrDate.getTime() === RetDate.getTime()))

  // res.send(returnFlights);
//   console.log('return', returnFlights);
  return returnFlights
}

const deleteFlight = async (req,res)=>{
   const id = req.params.id;
   let bookingsWithFlight = await Booking.find({$or:[{DepartureFlight: id},{ReturnFlight: id}]});

   Flight.findByIdAndDelete(id, (err, deleted) => {  
      if (err) 
        res.status(500).send({message: 'Could not delete flight'});
      else {
        console.log(`Deleted: ${deleted}`);
        res.send('Deleted: ' + deleted);
      }
    });
}

const updateFlight = (req, res) => {
   try{
      let arr = new Date(`${req.body.ArrDate}T${req.body.Arrival}:00`);
      let dep = new Date(`${req.body.DepDate}T${req.body.Departure}:00`); 
      const Price = {
         Econ:req.body.EconPrice,
         First:req.body.FirstPrice,
         Bus:req.body.BusPrice,
      }

      // const KidPrice = {
      //    con:req.body.EconPrice,
      //    First:req.body.FirstPrice,
      //    Bus:req.body.BusPrice,
   
      // }
      
      const Bag = {
         Econ: req.body.EconBag,
         First: req.body.FirstBag,
         Bus: req.body.BusBag,
      }
      let duration = calcFlightDuration(dep,arr);
      
      const updatedFlight = {
         FlightNumber: req.body.FlightNumber,
         Departure: getTime(dep),
         Arrival: getTime(arr),
         DepDate: req.body.DepDate,
         ArrDate: req.body.ArrDate,
         EconomySeats: req.body.EconomySeats,
         BusinessSeats: req.body.BusinessSeats,
         FirstClassSeats: req.body.FirstClassSeats,
         FromAirport: req.body.FromAirport,
         ToAirport: req.body.ToAirport,
         Terminal: req.body.Terminal,
         Price: Price,
         //KidPrice:KidPrice,
         BaggageAllowance: Bag,
         Duration: duration
      };
      Flight.findByIdAndUpdate(req.params.id, updatedFlight,(err, flight)=> {
         if(err){
            console.log(err);
            res.status(500).send({message: 'Could not update flight'});
            //return res.json({message : err});
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

const addSeats = (req,res)=>{
   let booking = req.body.Booking;
   let depId = booking.DepartureFlight;
   let retId = booking.ReturnFlight;
   let depSeats = booking.DepSeats;
   let retSeats = booking.RetSeats;
   Flight.findById(depId,(err,depFlight)=>{
      if(err)
         console.log(err);
      else{
         let newSeats = [...depFlight.SeatsList.Available, depSeats];
         let newSeatsList= {
            Econ: depFlight.SeatsList.Econ,
            Bus: depFlight.SeatsList.Bus,
            First: depFlight.SeatsList.First,
            Available: newSeats
         }
         Flight.findByIdAndUpdate({_id:depFlight._id},{SeatsList: newSeatsList} ,(err,doc)=>{
            if(err)
               console.log(err);
            else{
               Flight.findById(retId,(err,retFlight)=>{
                  if(err)
                     console.log(err);
                  else{
                     let newSeats = [...retFlight.SeatsList.Available, retSeats];
                     let newSeatsList= {
                        Econ: retFlight.SeatsList.Econ,
                        Bus: retFlight.SeatsList.Bus,
                        First: retFlight.SeatsList.First,
                        Available: newSeats
                     }
                     Flight.findByIdAndUpdate({_id:retFlight._id},{SeatsList: newSeatsList} ,(err,doc)=>{
                        if(err)
                           console.log(err);
                        else{
                           res.send("all done");
                        }
                     });
                  }
               })
            }
         });
      }
   })
}

const showSchedule = async(req,res)=>{
    const flights = await Flight.find({});
    sortByDate(flights);
    res.send(flights);
}

function calcFlightDuration (departure,arrival){
   //let arrival = new Date(`${arrDate}T${arrTime}:00`); //date obj
   //let departure = new Date(`${depDate}T${depTime}:00`); //date obj

   const dur=(arrival.getTime()-departure.getTime())/3600000 ;
   const diff=Math.floor(dur)+":"+Math.floor((dur%1) *60);

   return diff;

}

function updateSeats(flightId, bookedSeats){
   Flight.findById(flightId,(err,flight)=>{
      // console.log(flight);
      let newAvSeats = flight.SeatsList.Available.filter(seat=>{
         return bookedSeats.indexOf(seat) === -1
      })
      let newSeatsList = {
         Econ: flight.SeatsList.Econ,
         Bus: flight.SeatsList.Bus,
         First: flight.SeatsList.First,
         Available: newAvSeats
      }
      Flight.findByIdAndUpdate(flight._id,{SeatsList: newSeatsList},(err,flight)=>{
         if (err){
            console.log(err);
            return err
         }
         else{
            return flight;
         }
      })
   })
   return 'something wrong in update seats';
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
      if(+flights[i].DepDate==+flights[i+1].DepDate){ 
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
        var d1 = new Date(flights[i].DepDate.getFullYear(), flights[i].DepDate.getMonth(), flights[i].DepDate.getDate(), h1,flights[i].Departure.Minutes);
        var d2 = new Date(flights[i+1].DepDate.getFullYear(), flights[i+1].DepDate.getMonth(), flights[i+1].DepDate.getDate(), h2,flights[i+1].Departure.Minutes);
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
    arr.sort((a,b)=> new Date(a.DepDate) - new Date(b.DepDate));
    sortByTime(arr);
}



function createSeatsList(Economy,Business,First){
   let econlist = [];
   let buslist = [];
   let firstlist = [];
   for(i = 1; i<=Economy; i++){
      let newSeat = `E${i}`;
      econlist = [...econlist,newSeat];
   }
   for(i = 1; i<=Business; i++){
      let newSeat = `B${i}`;
      buslist = [...buslist,newSeat];
   }
   for(i = 1; i<=First; i++){
      let newSeat = `F${i}`;
      firstlist = [...firstlist,newSeat];
   }
   let list = {
      Econ: econlist,
      Bus: buslist,
      First: firstlist,
      Available: [...econlist,...buslist,...firstlist]
   };

   return list;

}




module.exports = {
    createFlight,
    showFlights,
    showFlightbyID,
    filterFlights,
    deleteFlight,
    updateFlight,
    showSchedule,
    calcFlightDuration,
    getTime,
    findReturnFlights,
    findReturnFlights2,
    searchFlights,
    updateSeats,
    addSeats
}