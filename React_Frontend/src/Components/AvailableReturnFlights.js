import React,{ Component, useEffect,useState } from 'react';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function AvailableReturnFlights(props){
  const [returnFlights,setReturnFlights] = useState(props.rFs);
  const [departureFlight, setDepartureFlight] = useState(props.departureFlight);
  const [cabinClass,setCabinClass]= useState(props.CabinClass);
  const [list,setList] = useState([])

  useEffect(() => {
    console.log('returnFlights',returnFlights);
    setList(returnFlights.map((returnFlight, key)=>
        (<FlightItem setRetF={props.setRetF} hideBtn={true} showSelect={false} showSelect2={true} CabinClass={props.CabinClass} depFlight = {departureFlight} flight={returnFlight} key={key}/>) )) 
  },[])

  return(
    <div>
          <h2> <em>Available Return Flights </em></h2>
          <div>
            <Accordion>
              {list}
            </Accordion>
          </div>

   </div>

  );
}