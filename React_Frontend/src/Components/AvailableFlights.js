import React,{ Component, useEffect,useState } from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import FlightSearchUser from './FlightSearchUser'; // import child
import { Accordion } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const api = 'http://localhost:8000';

export default function AvailableFlights(props){
  const location = useLocation();
  const [flights,SetFlights] = useState(location.state.flights);
  const [flightList, setFlightList] = useState()  

  
  // const Book =()=>{
  //   axios.post(`${api}/createBooking`,{
  //     DepartureFlight: 
      
  //    }).then((res) =>{

  //   })

  // }
  

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state.flights);
    console.log(location.state.RetDate);
    setFlightList(flights.map((flight, key)=>
        <FlightItem hideBtn={true} showSelect={true} flight={flight} key={key}/> ))
      
  return(
    <div>
          <h2> <em>Flights Available</em></h2>
          <div>
            <Accordion>
              {flightList}
            </Accordion>
          </div>
        </div> 
  );
}