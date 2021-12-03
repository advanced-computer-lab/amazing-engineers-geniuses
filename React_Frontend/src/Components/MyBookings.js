import React, {useEffect} from 'react';
import axios from 'axios';
import BookingItem from './BookingItem';

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




    const classes = useStyles();

    useEffect(async () => {
        var name = "test2"
       axios.post(`${api}/user/flight/viewReservations`,{username:"test2"})
        .then(async (res)=>{  
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
        },

        );
        
    }, []);
    

    return(
        <div>
            <h1 className = {classes.title}>My Bookings</h1>
            {list}
        </div>
    )
}