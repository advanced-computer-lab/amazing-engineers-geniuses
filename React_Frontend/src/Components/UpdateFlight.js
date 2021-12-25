import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {Form,Row,Col,Button,Container} from 'react-bootstrap';
const api = 'http://localhost:8000';


export default function UpdateFlight(props) {
    
    let history = useHistory();
    const id = props.match.params;
    const base = {
        FlightNumber: 0,
        Departure: '',
        DepDate: '',
        Arrival: '',
        ArrDate: '',
        EconomySeats: 0,
        BusinessSeats: 0,
        FirstClassSeats: 0,
        FromAirport: '',
        ToAirport: '',
        Terminal: 0,
        EconPrice: 0,
        BusPrice: 0,
        FirstPrice: 0,
        EconBag: 0,
        BusBag: 0,
        FirstBag: 0
    }
    const [updateBody,setUpdate] = useState(base);

    useEffect(() => {
        axios.get(`${api}/admin/flight/show/${id.id}`)
        .then((res)=>{
            let flight = res.data;
            let depdateString = flight.DepDate.split('T')[0];   
            let arrdateString = flight.ArrDate.split('T')[0];         
            setUpdate({
                FlightNumber: flight.FlightNumber,
                Departure: flight.Departure.AsString,
                DepDate: depdateString,
                Arrival: flight.Arrival.AsString,
                ArrDate: arrdateString,
                EconomySeats: flight.EconomySeats,
                BusinessSeats: flight.BusinessSeats,
                FirstClassSeats: flight.FirstClassSeats,
                FromAirport: flight.FromAirport,
                ToAirport: flight.ToAirport,
                Terminal: flight.Terminal,
                EconPrice: flight.Price.Econ,
                BusPrice: flight.Price.Bus,
                FirstPrice: flight.Price.First,
                EconBag: flight.BaggageAllowance.Econ,
                BusBag: flight.BaggageAllowance.Bus,
                FirstBag: flight.BaggageAllowance.First
            })
           // console.log('onmount ',flight.Departure.AsString)
        })

    }, [id.id])
    
const submitUpdate = () => {
    axios.put(`${api}/admin/flight/update/${id.id}`, updateBody)
    .then((res) =>{
        console.log(res, 'update');
        history.push('/admin/flight/show');
    }).catch((error)=>{
        if(error){
            console.log(error);
        };
    })
}

    return(
        <div>
            
            <Container>
                <h1>Update Flight</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="FlightNo">
                       <Row>
                            <Col>
                                <Form.Label>Flight No.</Form.Label>
                                <Form.Control type="number" value={updateBody.FlightNumber} placeholder="Enter flight #" min={0} onChange={(e) => setUpdate({...updateBody,FlightNumber: e.target.value})}/>
                            </Col>
                            <Col>
                                <Form.Label>Terminal</Form.Label>
                                <Form.Control type="number" value={updateBody.Terminal} placeholder="Enter Terminal #" onChange={(e) => setUpdate({...updateBody,Terminal: e.target.value})}/>
                            </Col>
                       </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Departure">
                        <Form.Label>Departure</Form.Label>
                        <Row>
                            <Col><Form.Control type="time" value={updateBody.Departure} onChange={(e) =>setUpdate({...updateBody,Departure: e.target.value})}/></Col>
                            <Col><Form.Control type="date" value={updateBody.DepDate} onChange={(e) => setUpdate({...updateBody,DepDate: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Arrival">
                        <Form.Label>Arrival</Form.Label>
                        <Row>
                            <Col><Form.Control type="time" value={updateBody.Arrival} onChange={(e) => setUpdate({...updateBody,Arrival: e.target.value})}/></Col>
                            <Col><Form.Control type="date" value={updateBody.ArrDate} onChange={(e) => setUpdate({...updateBody,ArrDate: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Number of Seats</Form.Label>
                        <Row>
                            <Col><Form.Control type="number" value={updateBody.EconomySeats} placeholder="Economy Class" min={0} onChange={(e) => setUpdate({...updateBody,EconomySeats: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.BusinessSeats} placeholder="Business Class" min={0} onChange={(e) => setUpdate({...updateBody,BusinessSeats: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.FirstClassSeats} placeholder="First Class" min={0} onChange={(e) => setUpdate({...updateBody,FirstClassSeats: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Price</Form.Label>
                        <Row>
                            <Col><Form.Control type="number" value={updateBody.EconPrice} placeholder="Economy Class" min={0} onChange={(e) => setUpdate({...updateBody,EconPrice: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.BusPrice} placeholder="Business Class" min={0} onChange={(e) => setUpdate({...updateBody,BusPrice: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.FirstPrice} placeholder="First Class" min={0} onChange={(e) => setUpdate({...updateBody,FirstPrice: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Baggage Allowance /Kg </Form.Label>
                        <Row>
                            <Col><Form.Control type="number" value={updateBody.EconBag} placeholder="Economy Class" min={0} onChange={(e) => setUpdate({...updateBody,EconBag: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.BusBag} placeholder="Business Class" min={0} onChange={(e) => setUpdate({...updateBody,BusBag: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={updateBody.FirstBag} placeholder="First Class" min={0} onChange={(e) => setUpdate({...updateBody,FirstBag: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Airports">
                        <Row>
                            <Col>
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text" value={updateBody.FromAirport} placeholder="Enter Deprature Airport" onChange={(e) => setUpdate({...updateBody,FromAirport: e.target.value.toUpperCase()})}/>
                            </Col>
                            <Col>
                                <Form.Label>To</Form.Label>
                                <Form.Control type="text" value={updateBody.ToAirport} placeholder="Enter Arrival Airport" onChange={(e) => setUpdate({...updateBody,ToAirport: e.target.value.toUpperCase()})}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Terminal">
                        
                    </Form.Group>
                    <Button variant="warning" onClick={submitUpdate} >
                        Update
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
    
