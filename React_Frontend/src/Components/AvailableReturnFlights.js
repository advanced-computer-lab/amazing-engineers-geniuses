import React,{ Component, useEffect,useState } from 'react';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function AvailableReturnFlights(props){
  const location = useLocation();
  const [returnFlights,SetReturnFlights] = useState();
  const [bookedFlight, setBookedFlight] = useState(location.state.bookedFlight);


  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state.returnFlights);
    console.log(location.state.bookedFlight);
    SetReturnFlights(location.state.returnFlights.map((returnFlight, key)=>
        <FlightItem hideBtn={true} showSelect={true} CabinClass={location.state.CabinClass} flight={returnFlight} key={key}/> )) 
  },[])
  

  return(
    <div>
          <h2> <em>Available Return Flights </em></h2>
          <div>
            <Accordion>
              {returnFlights}
            </Accordion>
          </div>
        </div> 
  );
}