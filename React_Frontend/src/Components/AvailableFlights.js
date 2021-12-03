import React, { useEffect, useState } from 'react';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

export default function AvailableFlights(props) {
  const location = useLocation();
  const [flights, setFlights] = useState(location.state.flightsWithReturn.map((tuple,i)=>(
               tuple.DepFlight 
            ))); 
  const [returnFlights, setReturns] = useState(location.state.flightsWithReturn.map((tuple,i)=>(
             tuple.ReturnFlights 
            )));
  const [flightList, setFlightList] = useState()  
 

  useEffect(() => {
    setFlightList(flights.map((flight, key)=>
 
      <FlightItem setDepF={props.setDepF} hideBtn={true} showSelect={true} showSelect2={false} CabinClass={props.CabinClass} flight={flight} returnFlights={returnFlights[flights.indexOf(flight)]} RetDate={location.state.RetDate} key={key}/> ))
  }, [])

  return (
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
