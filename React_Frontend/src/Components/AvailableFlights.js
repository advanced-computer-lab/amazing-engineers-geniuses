import React,{ Component, useEffect,useState } from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function AvailableFlights(props){
  const location = useLocation();
  const [flights,setFlights] = useState(location.state.flightsWithReturn.map((tuple,i)=>(
               tuple.DepFlight 
            )));
  const [returnFlights, setReturns] = useState(location.state.flightsWithReturn.map((tuple,i)=>(
               tuple.ReturnFlights 
            )));
  const [flightList, setFlightList] = useState()  



  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state.flightsWithReturn);
    //console.log(location.state.RetDate);
    setFlightList(flights.map((flight, key)=>
        <FlightItem hideBtn={true} showSelect={true} CabinClass={location.state.CabinClass} flight={flight} returnFlights={returnFlights[flights.indexOf(flight)]} RetDate={location.state.RetDate} key={key}/> )) 
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
