import React,{ useEffect } from 'react';
import { Form,FloatingLabel,Row,Col,InputGroup, Container,Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from 'axios';


const api = 'http://localhost:8000';

export default function SearchFlight(props){
    const history = useHistory();
    const[FromAirport,setFromAirport]=React.useState("");
    const[ToAirport,setToAirport]=React.useState("");
    const[CabinClass,setCabinClass]=React.useState('E');
    const[DepDate,setDepDate]=React.useState('');

    const[RetDate,setRetDate]=React.useState('');

   

    const[PassengersNumber,setPassengersNumber]=React.useState('');
    //const flights=[];

    const flightsAvailable = () =>{

        
        axios.post(`${api}/searchFlights`,{
           FromAirport:FromAirport,
           ToAirport:ToAirport,
           DepDate:DepDate,
           RetDate: RetDate
        }).then((res) =>{
            let flightsWithReturn=res.data;
            
            let flights = flightsWithReturn.map((tuple,i)=>(
               tuple.DepFlight 
            ))

            console.log(flights);
            flightsWithReturn = flightsWithReturn.filter(tuple=> tuple.DepFlight.SeatsList.Available.filter(seat => seat.charAt(0) === CabinClass ).length >= PassengersNumber)
            console.log(flightsWithReturn);
            history.push({
                pathname: '/availableFlights',
                state: { flightsWithReturn: flightsWithReturn, RetDate: RetDate, CabinClass: CabinClass }
            });    
        }).catch((error) =>{
            if(error){
                console.log(error);
            }
        })
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
                                <Form.Control  type="text" value={FromAirport} placeholder="Enter Deprature Airport" required onChange={(e) => setFromAirport(e.target.value)}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                 <InputGroup className="mb-3">

                                <InputGroup.Text>To</InputGroup.Text>
                                <Form.Control type="text" value={ToAirport} placeholder="Enter Arrival Airport" required onChange={(e) => setToAirport(e.target.value)}/>

                                </InputGroup>
                            </Col>
                        </Row>
                    </Form.Group>
              

            <Row className="align-items">
                <Col md="auto">
                    <Form.Group  controlId="formGridCabin">
                    <InputGroup className="mb-3">
                     <InputGroup.Text>Class</InputGroup.Text>
                     <Form.Select name="CabinClass"  placeholder="Cabin Class"value={CabinClass} required onChange={(e)=>setCabinClass(e.target.value)}>
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
                        <Form.Control   type="number" placeholder="PassengersNumber" name="PassengersNumber" required onChange={(e)=>setPassengersNumber(e.target.value)} />
                        {/* </FloatingLabel> */}
                    </Form.Group>
                </Col>

            </Row>
            
            <Row className="align-items">
                <Col md="auto">
                    <Form.Group controlId="formGridDepartue">
                     <InputGroup className="mb-3">
                      <InputGroup.Text>Departure</InputGroup.Text>

                        {/* <Form.Control  type="time" name="Departure" onChange={(e)=>setDeparture(e.target.value)} /> */}

                      
                        <Form.Control  type="date" name="DepDate" required onChange={(e)=>setDepDate(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group  controlId="formGridArrival">
                      <InputGroup className="mb-3">

                      <InputGroup.Text>Return</InputGroup.Text>
                        {/* <Form.Control   type="time" name="Arrival" onChange={(e)=>setArrival(e.target.value)} /> */}
                        <Form.Control   type="date" name="RetDate" required onChange={(e)=>setRetDate(e.target.value)} />

                        </InputGroup>
                    </Form.Group>
                </Col>

                   

            </Row>
               
            <Button className='btn btn-primary' onClick={flightsAvailable} >Search</Button>
            </Container>
        </Form>
       

   )

    
}