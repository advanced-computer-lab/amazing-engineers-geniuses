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


const viewReservations = async (req, res) => {
    userName = req.body.username;   
    User.find({username : userName}, async (err, data) => {
     try{
        if(err){
            console.log('errrrrrrrr')
            return res.json(err);
            
        }
        else
            if(data){
                console.log(data[0].Bookings);
                flightsArr = data[0].Bookings
                console.log(flightsArr, "flightdssssss")
                var resArr = []
                var flightsArr = [1,12]
    // for(let i=0;i<flightsArr.length;i++){
         await Flights.find( {FlightNumber : flightsArr[0]}, (error, data) => {
            if(error){
                // return res.json({ error});
            }
            else if(data){
                resArr.push(flightsArr[0]);
                console.log(resArr, 'sadsasadadsdadasdadsa');
            }
        })
        console.log(resArr, "reererererererreer");
            return res.json({resArr});              
            }
        }catch(error){
            if(error){
                return res.json({error});
                console.log("shittt")
            }
        }


        })

    
}



//         

    // console.log(userName);


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