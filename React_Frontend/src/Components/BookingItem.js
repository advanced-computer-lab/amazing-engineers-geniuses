import React,{useState,useEffect} from 'react';
import axios from 'axios';
const api = 'http://localhost:8000';

export default function BookingItem(props){
    const [dep,setDep] = useState('');
   
    useEffect(()=>{
         axios.post(`${api}/user/flight/getDepartureAirport`, {departureId : props.booking.DepartureFlight})
        .then((res) =>{
            console.log(res.data,"departure");
            setDep(res.data.data);
        }).catch((error)=>{
            if(error){
                console.log(error);
            };
        });
    },[])

    return(
        <div>
            Departure
            <ul>
               <li> {dep.FromAirport} </li>
                <li> {dep.ToAirport} </li>
            </ul>
            Return
            <ul>
            </ul>
              <br/>
        </div>
    )
}

