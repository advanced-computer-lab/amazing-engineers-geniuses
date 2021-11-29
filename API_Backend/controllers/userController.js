const User = require('../models/User');
const Flights = require('../models/Flight');

const viewReservations =  (req, res) => {
    userName = req.body.username;   
    let user =  User.findOne({username : "admin"}, async (err, data) => {
        if(err){
            console.log('errrrrrrrr')
            return res.json(err);
            
        }
        else
         
        if(data){
            // console.log("founddddd");
            // try{
            var FlightsArr = [];
            var resArr = data.Reservations;
            console.log(resArr, 'resaaaaaarrrrrr')
            for(let i =0; i<resArr.length; i++){
                Flights.find( {FlightNumber : resArr[i]}, (err, data) => {
                    if(err){
                        return res.json({"error" : err});
                    }
                    else if(data){
                        // console.log(data[0]);
                        FlightsArr.push(data);
                        console.log(FlightsArr, 'sadsasadadsdadasdadsa');
                        
                    }
                })
            // }
            console.log(FlightsArr, 'thhthththtthththtterrrreee')
            res.send(FlightsArr);
    
            }
        // catch(err){
        //     return res.json({error : err});
        // }
    }
      
    });
    // console.log(userName);
 }

 const cancelReservation = async (req, res) => {
    var reservationsArr = [];
    userName = req.body.username;
    flightNumber = req.body.flightNumber;
    try{
    let user =  await User.findOne({username: userName}, (err, data) => {
        if(err){
            return res.json({"error" : err});
        }
        else{
        
            console.log(reservationsArr,'firstttt');
            data.Reservations = data.Reservations.filter(item => item !== flightNumber);
              console.log(data.Reservations);
        }
        data.save();   
        });
   
    }
    catch(err){
        console.log(err);
    }

    return res.json({"message" : "reservation successfully cancelled"});
       
 }




module.exports = {
    viewReservations,
    cancelReservation
}