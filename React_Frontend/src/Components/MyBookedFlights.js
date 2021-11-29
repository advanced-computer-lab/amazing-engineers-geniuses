import React, {useEffect} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
const api = 'http://localhost:8000';

export default function MyBookedFlights(props) {

    const [flightsArr, setFlightsArr] = React.useState([]);
    const [clicked, setClicked] = React.useState(false);
    const user = "admin";

    // useEffect(() => {
        // try{
            // useEffect( () => {
               
            
            // }, [])


        // }





    //      axios.get("http://localhost:8000/user/flight/viewReservations", {body : {username : "admin"}})
    //     .then((res)=>{
    //        console.log(res.data);
    //        console.log("blalblalalalalalala")
    //     })
    // }
    // catch(err){
    //     console.log(err);
    // }
    // }, [clicked])

    const buttonClicked = async () => {
       await axios.get(`${api}/user/flight/viewReservations`, {
            //  username : "admin"
          })
        .then((res)=>{
           console.log('doneeee');
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
        setClicked(!clicked);
    }



    /// wanna get each flight using the number, in useeffect, and send in an object 
    
    return(
        <div>
            <button onClick = {buttonClicked}>totototot</button>
            
            
            toooottt</div>
    )
}