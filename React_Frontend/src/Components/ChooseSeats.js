import React,{useState } from 'react';
import Seats from './Seats';
import {Row,Col } from 'react-bootstrap';

export default function ChooseSeats(props){
    const[depClass,setDepClass]= useState(props.bookingInfo.DepCabinClass);
    const[retClass, setRetClass] = useState(props.bookingInfo.RetCabinClass);
    const[passengersNumber, setPassengersNumber] = useState(props.bookingInfo.NumberOfPassengers);
    const[departureFlight,setDepFlight]= useState(props.bookingInfo.DepartureFlight);
    const[returnFlight,setReturnFlight]= useState(props.bookingInfo.ReturnFlight);

    return(        
        <div>
          <br/>
          <Row>
           <Col>
                <h2> <em>DEPARTURE FLIGHT: </em></h2>
                <div>
                    <Seats Seats={departureFlight.SeatsList} CabinClass={depClass} setSeats={props.setDepSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert} />

                </div>
           </Col>

            <Col>
              <h2> <em>RETURN FLIGHT: </em></h2>
              <div>
                <Seats Seats={returnFlight.SeatsList} CabinClass={retClass} setSeats={props.setRetSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert}/>
              </div>
            </Col>
          </Row>

          <br/>
          <li style={{listStyleType:'none'}}> <i style={{color: 'lightgrey', border:'none'}} className="fas fa-square fa-2x"></i>    AVAILABLE</li>
          
          <li style={{listStyleType:'none'}}> <i style={{color: 'red', border:'none'}} className="fas fa-square fa-2x"></i>    ALREADY BOOKED </li>

          <li style={{listStyleType:'none'}}> <i style={{color: 'lightblue', border:'none'}} className="fas fa-square fa-2x"></i>    CHOSEN  </li>

       </div>

    );

}