import React,{ Component, useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import FlightItem from './FlightItem';
import Seats from './Seats';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function ChooseSeats(props){
    const location = useLocation();
    //const [flights,SetFlights] = useState(location.state.flights);
    const[cabinClass,setCabinClass]= useState(location.state.CabinClass);
    const[passengersNumber,setPassengersNumber]= useState(location.state.passengersNumber);
    //const[departureFlight,setDepartureFlight]= useState(location.state.departureFlight);
    const[departureFlight,setDepFlight]= useState(location.state.departureFlight);
    const[returnFlight,setReturnFlight]= useState(location.state.returnFlight);

    return(        
        <div>
            <h2> <em>DEPARTURE FLIGHT: </em></h2>
            <div>
                <Seats Seats={departureFlight.SeatsList} CabinClass={cabinClass}/>
            </div>

            <h2> <em>RETURN FLIGHT: </em></h2>
            <div>
                <Seats Seats={returnFlight.SeatsList} CabinClass={cabinClass}/>
            </div>

       </div>

    );

}