import React,{ useEffect } from 'react';
import { Form,FloatingLabel,Row,Col,InputGroup, Container,Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from 'axios';


const api = 'http://localhost:8000';

export default function SearchFlight(props){
    let history=useHistory();
    const[FromAirport,setFromAirport]=React.useState("CAI");
    const[ToAirport,setToAirport]=React.useState("");
    const[CabinClass,setCabinClass]=React.useState('E');
    const[Departure,setDeparture]=React.useState('');
    const[Arrival,setArrival]=React.useState('');
    const[DepDate,setDepDate]=React.useState('');
    const[ArrDate,setArrDate]=React.useState('');
    const[PassengersNumber,setPassengersNumber]=React.useState('');
    //const flights=[];

    const flightsAvailable = () =>{
        console.log("arfffff");
        axios.post(`${api}/filterFlights`,{
           FromAirport:FromAirport,
           ToAirport:ToAirport,
           Departure:Departure,
           Arrival:Arrival,
           DepDate:DepDate,
           ArrDate:ArrDate,

        }).then((res) =>{
        
            let flights=res.data;
            console.log(flights);
            flights = flights.filter(flight=> flight.SeatsList.Available.filter(seat => seat.charAt(0) === CabinClass ).length >= PassengersNumber)
            console.log(flights);
            history.push({
                pathname: '/availableFlights',
                state: { flights: flights }
            });
            
                   
        }).catch((error) =>{
            if(error){
                console.log(error);
            }
        })
        console.log("arfffff tanyyyy");
    }


   return(
        <Form>
               <Container  style={{
            //    backgroundColor:'#00BFFF',
            //    width:'800px',
            //    height:'200px',
               
           }}>
               <Form.Group className="mb-3" controlId="Airports">
                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                <InputGroup.Text>From</InputGroup.Text>
                                <Form.Control type="text" value={FromAirport} placeholder="Enter Deprature Airport" onChange={(e) => setFromAirport(e.target.value)}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                 <InputGroup className="mb-3">
                                <InputGroup.Text>From</InputGroup.Text>
                                <Form.Control type="text" value={ToAirport} placeholder="Enter Arrival Airport" onChange={(e) => setToAirport}/>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form.Group>
              

            <Row className="align-items">
                <Col md="auto">
                    <Form.Group  controlId="formGridCabin">
                    <InputGroup className="mb-3">
                     <InputGroup.Text>Class</InputGroup.Text>
                     <Form.Select name="CabinClass"  placeholder="Cabin Class"value={CabinClass} onChange={(e)=>setCabinClass(e.target.value)}>
                     <option value="E">Economy</option>
                     <option value="B">Business</option>
                     <option value="F">First</option>
                     </Form.Select>
                    </InputGroup>
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group controlId="formGridPassengers">
                        {/* <FloatingLabel column="sm" controlId="floatingInput" label="Number of Passengers"> */}
                        <Form.Control   type="number" placeholder="PassengersNumber" name="PassengersNumber" onChange={(e)=>setPassengersNumber(e.target.value)} />
                        {/* </FloatingLabel> */}
                    </Form.Group>
                </Col>

            </Row>
            
            <Row className="align-items">
                <Col md="auto">
                    <Form.Group controlId="formGridDepartue">
                     <InputGroup className="mb-3">
                      <InputGroup.Text>Departure</InputGroup.Text>
                        <Form.Control  type="time" name="Departure" onChange={(e)=>setDeparture(e.target.value)} />
                        <Form.Control  type="date" name="DepDate" onChange={(e)=>setDepDate(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group  controlId="formGridArrival">
                      <InputGroup className="mb-3">
                      <InputGroup.Text>Arrival</InputGroup.Text>
                        <Form.Control   type="time" name="Arrival" onChange={(e)=>setArrival(e.target.value)} />
                        <Form.Control   type="date" name="Arrival"onChange={(e)=>setArrDate(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                </Col>

                   

            </Row>
               
            <Button className='btn btn-primary' onClick={flightsAvailable} >Search</Button>
            </Container>
        </Form>
       

   )

    
}