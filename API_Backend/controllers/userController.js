const User = require('../models/User');
const Flights = require('../models/Flight');
const nodemailer = require("nodemailer");

const sendEmail = (req, res) => {
    let userEmail = req.body.email;
    let emailSubject = req.body.emailSubject
    let emailBody = req.body.emailBody

    let transporter = nodemailer.createTransport({
        service:'outlook',
        auth: {
            user: 'amazingairlines@outlook.com',
            pass: '5amazingengineers'
        }
    });
    message = req.body.message

    let mailOptions = {
        from: '"Amazing Air" amazingairlines@outlook.com', // sender address
        to: userEmail, // list of receivers
        subject: emailSubject, // Subject line
        text: emailBody // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return
         
        }
        res.json(info);

    });
}


const viewReservations =  (req, res) => {
    userName = req.body.username;   
    let user =  User.findOne({username : "admin"},  (err, data) => {
        if(err){
            console.log('errrrrrrrr')
            return res.json(err);
            
        }
        else
         
        if(data){

            var FlightsArr = [];
            var resArr = data.Reservations;
            console.log(resArr, 'resaaaaaarrrrrr')
                 Flights.find( {FlightNumber : 1}, (error, data) => {
                    if(error){
                        return res.json({ error});
                    }
                    else if(data){
                     
                        console.log(FlightsArr, 'sadsasadadsdadasdadsa');
                        return res.json({data});
                    }
                })
            console.log(FlightsArr, 'thhthththtthththtterrrreee')
           
    
            
        
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
    cancelReservation,
    sendEmail
}