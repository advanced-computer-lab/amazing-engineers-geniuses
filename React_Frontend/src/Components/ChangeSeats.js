import React,{useState } from 'react';
import { Container } from 'react-bootstrap';
import Seats from './Seats';
import {Row,Col } from 'react-bootstrap';
import axios from 'axios';

const api = 'http://localhost:8000';

export default function ChangeSeats(props){
    // const[depClass,setDepClass]= useState(props.bookingInfo.DepCabinClass);
    // const[retClass, setRetClass] = useState(props.bookingInfo.RetCabinClass);
    const[passengersNumber, setPassengersNumber] = useState(props.NumberOfPassengers);
    // const[departureFlight,setDepFlight]= useState(props.bookingInfo.DepartureFlight);
    // const[returnFlight,setReturnFlight]= useState(props.bookingInfo.ReturnFlight);
    const[flight,setFlight] = useState(props.flight);
    const[cabin,setCabin] = useState(props.cabin);

    const [newSeats, setNewSeats] = useState();


    const found =  props.chosenSeats.some(r=> flight.SeatsList.Available.includes(r))
    if(!found){
        let editedSeatsList = {
            ...flight.SeatsList,
            Available: [...flight.SeatsList.Available, ...props.chosenSeats]
        }
        let editedFlight = {
            ...flight,
            SeatsList: editedSeatsList
        }
        setFlight(editedFlight);
    }

    const editFlight = ()=>{
        axios.put(`${api}/user/booking/editSeats`,{
            flight: flight,
            oldChosen: props.chosenSeats,
            newChosen: newSeats,
            booking: props.booking,
            type: props.type
        }).then((res)=>{
            console.log('successss');
        }).catch((err)=>console.log(err));
        props.setMainView("main");
    }


    return(        
        <Container style={{paddingBottom: '10px'}}>
          <br/>
          <Row>
           <Col>
                <h2> <em>Change Seats: </em></h2>
                <div>
                    <Seats Seats={flight.SeatsList} CabinClass={cabin} setSeats={setNewSeats} PassengersNumber={passengersNumber} showAlert={props.showAlert} editing={true} chosenSeats={props.chosenSeats}/>

                </div>
           </Col>

          </Row>

          <br/>
          <li style={{listStyleType:'none'}}> <i style={{color: 'lightgrey', border:'none'}} className="fas fa-square fa-2x"></i>    AVAILABLE</li>
          
          <li style={{listStyleType:'none'}}> <i style={{color: 'red', border:'none'}} className="fas fa-square fa-2x"></i>    ALREADY BOOKED </li>

          <li style={{listStyleType:'none'}}> <i style={{color: 'lightblue', border:'none'}} className="fas fa-square fa-2x"></i>    CHOSEN  </li>

        <button class='btn-warning' onClick={editFlight}>Change</button>
       </Container>

    );

}