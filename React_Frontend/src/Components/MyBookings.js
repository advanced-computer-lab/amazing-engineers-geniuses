import React, {useEffect} from 'react';
import axios from 'axios';
import Booking from './Booking';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Modal from '@mui/material/Modal';
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

    const [flightsArr, setFlightsArr] = React.useState([]);
    const [clicked, setClicked] = React.useState(false);
    // const [canceledNumber, setCanceledNumber] = React.useState(0);
    const [open, setOpen] = React.useState(false);


    const handleConfirmOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const cancelRequest = async (e, canceledNumber) => {
        axios.post(`${api}/user/flight/cancelReservations`, {username : "admin", flightNumber: canceledNumber.toString()})
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

       await axios.get(`${api}/user/flight/viewReservations`)
        .then((res)=>{
            console.log(res.data);
           setFlightsArr([...flightsArr, res.data]);
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    }, []);

  

    
    return(
        <div>
            <div className = {classes.title}>
                 <h1>My Bookings</h1>
            </div>
            {flightsArr.map((flight, key) => {
               console.log(flight.data[0].ArrDate, "bobobob")
                return(
                    <Box>
                    <Booking 
                        fromAirport = {flight.data[0].FromAirport}
                        toAirport = {flight.data[0].ToAirport}
                        day = {flight.data[0].DepDate.substring(8,10)}
                        date = {flight.data[0].DepDate.substring(0,7)}
                        price = "5000"
                        handleConfirmOpen = {handleConfirmOpen}
                    ></Booking>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                >
            <Box sx={style}>
                <div className = {classes.modalDetails}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to cancel your booking?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Clicking yes will remove your booking 
                </Typography>
                </div>
                <div className = {classes.buttonGroup}>
                    <Button onClick = {(e) => {cancelRequest(e, flight.data[0].FlightNumber)}} className = {classes.confirmCancel}> YES </Button>
                    <Button onClick = {() => {setOpen(false)}}className = {classes.noCancel}> NO </Button>
                </div>
            </Box>
            
            </Modal>
      </Box>
                )
            })} 
        </div>
    )
}


/// 