import React,{ Component, useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import FlightItem from './FlightItem';
import Seats from './Seats';
import { Accordion,Row,Col } from 'react-bootstrap';

const api = 'http://localhost:8000';

export default function ChooseSeats(props){
    const[cabinClass,setCabinClass]= useState(props.bookingInfo.CabinClass);
    const [passengersNumber, setPassengersNumber] = useState(props.bookingInfo.NumberOfPassengers);
    const[departureFlight,setDepFlight]= useState(props.bookingInfo.DepartureFlight);
    const[returnFlight,setReturnFlight]= useState(props.bookingInfo.ReturnFlight);

    return(        
        <div>
          <Row>
           <Col>
                <h2> <em>DEPARTURE FLIGHT: </em></h2>
                <div>
                    <Seats Seats={departureFlight.SeatsList} CabinClass={cabinClass} setSeats={props.setDepSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert} />
                </div>
           </Col>

            <Col>
              <h2> <em>RETURN FLIGHT: </em></h2>
              <div>
                <Seats Seats={returnFlight.SeatsList} CabinClass={cabinClass} setSeats={props.setRetSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert}/>
              </div>
            </Col>
          </Row>

       </div>

    );

}