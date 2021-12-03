import React, {useEffect} from 'react';
import axios from 'axios';
import Booking from './Booking';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Modal from '@mui/material/Modal';
import BookingItem from './BookingItem';
const api = 'http://localhost:8000';


const useStyles = makeStyles((theme) => ({

    title: {
        marginLeft: "39vw",
        marginTop : "3vw",
     //    marginBottom : "-2vw"
     }
}));


const style = {
    TextAlign : 'center!important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



export default function MyBookedFlights(props) {

    const [bookings, setBookings] = React.useState([]);
    const [clicked, setClicked] = React.useState(false);
    // const [canceledNumber, setCanceledNumber] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState([]);


    const handleConfirmOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const cancelRequest = async (e, canceledNumber) => {
        axios.post(`${api}/user/flight/cancelReservations`, {username : "test2", flightNumber: canceledNumber.toString()})
        .then((res) => {
            console.log(canceledNumber, "canceleeeeddd");
            console.log(res.data);
            console.log("successs");
        }).catch((error) => {
            if(error){
                console.log(error);
            }
        })
        
        setOpen(false);
        
        await axios.post(`${api}/user/sendConfirmation`, {email: "davidedwarattia@gmail.com", emailSubject: "here", emailBody: "you have peaked"})
        .then((res) => {
            console.log("email sent")
            console.log(res.data)
        }).catch((error) =>{
            if(error){
                console.log(error);
            }
        })

     
    }


    const classes = useStyles();

    useEffect(async () => {
        var name = "test2"
       await axios.get(`${api}/user/flight/viewReservations`,{username:"test2"})
        .then((res)=>{
            console.log(res.data.listOfBookings, "ress dataaa");
            setBookings(res.data.listOfBookings);
            setList(res.data.listOfBookings.map((booking)=>
                 (<BookingItem booking={booking}/>)
            ))
        })
        .catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    }, []);

    
    const getArrival = () => {
         axios.get(`${api}/user/flight/getArrivalAirport`, {arrivalId : "61a4b96f5c0946c174b3b0cb"})
        .then((res) =>{
            console.log(res,"arrival airport");
            return res.arrivalAirport;
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    }
    const getDeparture = (flightId) => {

        axios.get(`${api}/user/flight/getDepartureAirport`, {departureId : flightId})
        .then((res) =>{
            console.log(res,"departure");
            return res.departureAirport;
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    }

    
    // return(
    //     <div>
    //         <div className = {classes.title}>
    //              <h1>My Bookings</h1>
    //         </div>
    //         {/* {flightsArr[.map((item,i) => <li key={i}>Test</li>)} */}
    //         {flightsArr.map((flight, key) => {
    //                 console.log(flight.DepartureFlight);
    //                 // console.log(flight.DepartureFlight, "Departure flighttt")
    //                 // console.log(flight.ReturnFlight, "return flighttt")
    //                 getDeparture(flight.DepartureFlight);
    //                 // const departureAirport = getDeparture(flight.ReturnFlight);
    //                 // console.log(flightsArr, "flights arrr")
    //                 console.log(key, "keyyyyyy")
    //                 // console.log(flight[key].TotalCost, "flight flight")
    //                 // console.log(flight.listOfBookings, "bobobob")
    //             return(
    //                 <Box>
    //                 <Booking 
    //                     fromAirport = "bob"
    //                     // toAirport = {flight.[0].ToAirport}
    //                     // day = {flight.data[0].DepDate.substring(8,10)}
    //                     // date = {flight.data[0].DepDate.substring(0,7)}
    //                     // price = "5000"
    //                     // handleConfirmOpen = {handleConfirmOpen}
    //                 ></Booking>
    //                 <Modal
    //                     open={open}
    //                     onClose={handleClose}
    //                     aria-labelledby="modal-modal-title"
    //                     aria-describedby="modal-modal-description"
    //             >
    //         <Box sx={style}>
    //             <div className = {classes.modalDetails}>
    //             <Typography id="modal-modal-title" variant="h6" component="h2">
    //                 Are you sure you want to cancel your booking?
    //             </Typography>
    //             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //                 Clicking yes will remove your booking 
    //             </Typography>
    //             </div>
    //             <div className = {classes.buttonGroup}>
    //                 <Button onClick = {(e) => {cancelRequest(e, flight.data[0].FlightNumber)}} className = {classes.confirmCancel}> YES </Button>
    //                 <Button onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
    //             </div>
    //         </Box>
            
    //         </Modal>
    //   </Box>
    //             )
    //         })} 
    //     </div>
    // )


    return(
        <div>
            {list}
        </div>
    )
}


/// 