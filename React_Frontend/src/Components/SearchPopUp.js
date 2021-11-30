import React,{ useEffect } from 'react';
import { Form,FloatingLabel,Row,Col,InputGroup, Container,Button, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from 'axios';
const api = 'http://localhost:8000';

export default function SearchPopUp({parentToChild}){
    let history= useHistory();
    //const{FromAirport,ToAirport}=props.route.params;
    const[FromAirport,setFromAirport]=React.useState('');
    const[ToAirport,setToAirport]=React.useState('');
    const[CabinClass,setCabinClass]=React.useState('E');
    const[Departure,setDeparture]=React.useState('');
    const[Arrival,setArrival]=React.useState('');
    const[DepDate,setDepDate]=React.useState('');
    const[ArrDate,setArrDate]=React.useState('');
    const[PassengersNumber,setPassengersNumber]=React.useState('');



    // const submitUpdate = () => {
    //     axios.get(`${api}/avalaibleFlight`, {
            
    //         FromAirport:FromAirport,
    //         ToAirport:ToAirport,
    //         Departure:Departure,
    //         Arrival:Arrival,
    //         DepDate:DepDate,
    //         ArrDate:ArrDate,
    //         FromAirport:FromAirport,
    //         ToAirport:ToAirport,
           
    
    //     }).then((res) =>{
    //         console.log(res, 'avaiable flights');
    //        // history.push('/availableFlights');
    //     }).catch((error)=>{
    //         if(error){
    //             console.log(error);
    //         };
    //     })
    // }

    return(
        <div>

    <Modal
      {...parentToChild}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search For a Flight
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
             <Row className="align-items">
                    <Form.Group as={Col} controlId="formGridFromAirport">
                    <FloatingLabel  controlId="floatingInput" label="FromAirport" className="mb-5" >
                     <Form.Control  type="text" placeholder="FromAirport"  name="FromAirport" value={FromAirport} onChange={(e)=>setFromAirport(e.target.value)} />
                     </FloatingLabel>
                     </Form.Group>
                     {/* <Col xs={3}>
                     <image src="two-way-arrows.png" roundedCircle />
                     </Col> */}
                     <Form.Group as={Col} controlId="formGridToAirport">
                        <FloatingLabel  controlId="floatingInput" label="ToAirport" className="mb-5" >
                        <Form.Control  type="text" placeholder="ToAirport" value={ToAirport} onChange={(e)=>setToAirport(e.target.value)} />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCabin">
                    <InputGroup className="mb-2">
                     <InputGroup.Text>Class</InputGroup.Text>
                     <Form.Select size="lg" name="CabinClass"  placeholder="Cabin Class"value={CabinClass} onChange={(e)=>setCabinClass(e.target.value)}>
                     <option value="E">Economy</option>
                     <option value="B">Business</option>
                     <option value="F">First</option>
                     </Form.Select>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassengers">
                        <FloatingLabel column="sm" controlId="floatingInput" label="Number of Passengers">
                        <Form.Control   type="number" placeholder="PassengersNumber" name="PassengersNumber" onChange={(e)=>setPassengersNumber(e.target.value)}/>
                        </FloatingLabel>
                    </Form.Group>

                </Row>
            
                <Row className="align-items">
                    <Form.Group as={Col} controlId="formGridDepartue">
                        <Form.Label column="sm">Departure</Form.Label>
                        <Form.Control  type="time" name="Departure" onChange={(e)=>setDeparture(e.target.value)} />
                        <Form.Control  type="date" name="DepDate" onChange={(e)=>setDepDate(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridArrival">
                        <Form.Label column="sm" >Arrival</Form.Label>
                        <Form.Control   type="time" name="Arrival" onChange={(e)=>setArrival(e.target.value)} />
                        <Form.Control   type="date" name="Arrival" onChange={(e)=>setArrDate(e.target.value)} />
                    </Form.Group>

                   

                </Row>
            </Container>
   
      </Modal.Body>
      <Modal.Footer>
        <Button >Search</Button>
      </Modal.Footer>
    </Modal>        

         
        </div>

    )
    // onClick={history.push("/availableFlights")}

}