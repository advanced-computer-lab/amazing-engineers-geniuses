import React,{useState} from 'react';
import {Form,Button,Modal,Row,Col} from 'react-bootstrap';

export default function FilterModal(props){
    
    const empty = {
        FlightNumber: '',
        Departure: '',
        Arrival: '',
        DepDate:'',
        ArrDate:'',
        EconomySeats: '',
        BusinessSeats: '',
        FirstClassSeats: '',
        FromAirport: '',
        ToAirport: '',
        Terminal:''
    }
    const [filterCriteria, setFilter] = useState(empty);
    
    const submit = (e)=>{
        console.log(filterCriteria);
        props.submitForm(e,filterCriteria);
        //setFilter(empty);
    }
    

    return(
        <Modal show={props.show} onHide={props.onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Filter Flights</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="FlightNo">
                        <Form.Label>Flight No.</Form.Label>
                        <Form.Control type="number" value={filterCriteria.FlightNumber} placeholder="Enter flight #" min={0} onChange={(e) => setFilter({...filterCriteria,FlightNumber: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Departure">
                        <Form.Label>Departure</Form.Label>
                        <Row>
                            <Col><Form.Control type="time" value={filterCriteria.Departure} onChange={(e) => setFilter({...filterCriteria,Departure: e.target.value})}/></Col>
                            <Col><Form.Control type="date" value={filterCriteria.DepDate} onChange={(e) => setFilter({...filterCriteria,DepDate: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Arrival">
                        <Form.Label>Arrival</Form.Label>
                        <Row>
                            <Col><Form.Control type="time" value={filterCriteria.Arrival} onChange={(e) => setFilter({...filterCriteria,Arrival: e.target.value})}/></Col>
                            <Col><Form.Control type="date" value={filterCriteria.ArrDate} onChange={(e) => setFilter({...filterCriteria,ArrDate: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Number of Seats</Form.Label>
                        <Row>
                            <Col><Form.Control type="number" value={filterCriteria.EconomySeats} placeholder="Economy Class" min={0} onChange={(e) => setFilter({...filterCriteria,EconomySeats: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={filterCriteria.BusinessSeats} placeholder="Business Class" min={0} onChange={(e) => setFilter({...filterCriteria,BusinessSeats: e.target.value})}/></Col>
                            <Col><Form.Control type="number" value={filterCriteria.FirstClassSeats} placeholder="First Class" min={0} onChange={(e) => setFilter({...filterCriteria,FirstClassSeats: e.target.value})}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Airports">
                        <Row>
                            <Col>
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text" value={filterCriteria.FromAirport} placeholder="Enter Departure Airport" onChange={(e) => setFilter({...filterCriteria,FromAirport: e.target.value.toUpperCase()})}/>
                            </Col>
                            <Col>
                                <Form.Label>To</Form.Label>
                                <Form.Control type="text" value={filterCriteria.ToAirport} placeholder="Enter Arrival Airport" onChange={(e) => setFilter({...filterCriteria,ToAirport: e.target.value.toUpperCase()})}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Terminal">
                        <Form.Label>Terminal</Form.Label>
                        <Form.Control type="number" value={filterCriteria.Terminal} placeholder="Enter Terminal #" onChange={(e) => setFilter({...filterCriteria,Terminal: e.target.value})}/>
                    </Form.Group>
                    <Button variant="warning" type="submit" onClick={submit} >
                        Filter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}