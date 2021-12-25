import React,{useEffect, useState } from 'react';
import Seats from './Seats';
import {Row,Col,ProgressBar} from 'react-bootstrap';
import '../Styles/progressBar.css';

export default function ChooseSeats(props){
    const[depClass,setDepClass]= useState(props.bookingInfo.DepCabinClass);
    const[retClass, setRetClass] = useState(props.bookingInfo.RetCabinClass);
    const[passengersNumber, setPassengersNumber] = useState(props.bookingInfo.NumberOfPassengers);
    const[departureFlight,setDepFlight]= useState(props.bookingInfo.DepartureFlight);
    const[returnFlight,setReturnFlight]= useState(props.bookingInfo.ReturnFlight);
    const [now,setNow] = useState(0);
    const[totalSeats,setTotalSeats]=useState(0);
    
    useEffect(() => {
      numberOfSeats();
   }, [totalSeats])
   
   function numberOfSeats(){
    let y=(totalSeats/(passengersNumber*2)) *100;
    setNow(y);
    console.log(now);
  }

    return(        
        <div>
          <br/>
         <Row>
         <ProgressBar now={now} label={`${now}%`} />
         </Row>
         
         
          <Row>
          
           <Col>
                <h2> <em>DEPARTURE FLIGHT: </em></h2>
                <div>
                    <Seats totalSeats={totalSeats} setTotalSeats={setTotalSeats} Seats={departureFlight.SeatsList} CabinClass={depClass} setSeats={props.setDepSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert} />

                </div>
           </Col>

            <Col>
              <h2> <em>RETURN FLIGHT: </em></h2>
              <div>
                <Seats totalSeats={totalSeats} setTotalSeats={setTotalSeats} Seats={returnFlight.SeatsList} CabinClass={retClass} setSeats={props.setRetSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert}/>
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