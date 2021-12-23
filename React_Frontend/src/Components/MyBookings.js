import React, {useEffect} from 'react';
import axios from 'axios';
import BookingItem from './BookingItem';
import Auth from '../services/Auth';
import {Spinner} from 'react-bootstrap'

import { makeStyles } from "@mui/styles";


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
    const curUser = Auth.getCurrentUser();
    const [showSpinner, setSpinner] = React.useState(true);




    const classes = useStyles();

    useEffect(async () => {
        var name = curUser.username
       axios.post(`${api}/user/flight/viewReservations`,{username: name})
        .then(async (res)=>{  
            console.log(res.data.listOfBookings, "ress dataaa");
            setBookings(res.data.listOfBookings);
            if(res.data.listOfBookings.includes(null)){
                let indexOfNull = res.data.listOfBookings.indexOf(null);
                res.data.listOfBookings.splice(indexOfNull,1);
            }
            setList(res.data.listOfBookings.map((booking)=>
                 (<BookingItem booking={booking}/>)
            ))
            setSpinner(false);
        })
        .catch((error)=>{
            if(error){
                console.log(error);
            };
        },

        );
        
    }, []);

    
    

    return(
        <div>
            {showSpinner && 
            <div className="pos-center text-primary" style={{width: '100px', height: '100px'}} >   
              <Spinner animation="border" />
              <span >Loading...</span>
              {/* </Spinner> */}
            </div>}
            {!showSpinner && <div>
                <h1 className = {classes.title}>My Bookings</h1>
                {list}
            </div>}
        </div>
    )
}