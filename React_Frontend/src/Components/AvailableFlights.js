import React,{ Component, useEffect,useState } from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function AvailableFlights(props){
  const location = useLocation();
  const [flights,SetFlights] = useState(location.state.flights);
  const [flightList, setFlightList] = useState()  
  const [departureFlight,setDepartureFlight] = useState();

  
  const Book = (flight) => {
    const bookedId = flight._id;
    console.log("aaaaaaaa");
  }
  

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state.flights);
    console.log(location.state.RetDate);
    setFlightList(flights.map((flight, key)=>
        <FlightItem hideBtn={true} showSelect={true} showSelect2={false} CabinClass={location.state.CabinClass} flight={flight} key={key} Book={Book}/> )) 
  },[])
      
  return(
    <div>
          <h2> <em>Available Departure Flights</em></h2>
          <div>
            <Accordion>
              {flightList}
            </Accordion>
          </div>
        </div> 
  );
}