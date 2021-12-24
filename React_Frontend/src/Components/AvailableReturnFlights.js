import React,{ useEffect,useState } from 'react';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';


export default function AvailableReturnFlights(props){
  const [returnFlights,setReturnFlights] = useState(props.rFs);
  const [departureFlight, setDepartureFlight] = useState(props.departureFlight);
  const [list,setList] = useState([])

  useEffect(() => { //check passing props.bookingInfo is okkk
    console.log('returnFlights',returnFlights);
    setList(returnFlights.map((returnFlight, key)=>
        (<FlightItem bookingInfo={props.bookingInfo} setDisplay={props.setDisplay} editRet={props.editRet} setRetF={props.setRetF} hideBtn={true} showSelect={false} showSelect2={true} CabinClass={props.CabinClass} depFlight = {departureFlight} flight={returnFlight} key={key}/>) )) 
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