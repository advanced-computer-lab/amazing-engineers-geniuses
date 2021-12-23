import React, { useEffect, useState } from 'react';
import { Form, Row, Col, InputGroup, Container, Button, Spinner, Modal, ModalBody, Card } from "react-bootstrap";

import { useHistory, useLocation } from "react-router-dom";
import BookingItem from './BookingItem';
import Booking from './Booking';
//const Flight = require('../models/Flight');
import axios from 'axios';
import SearchFlight from './SearchFlight';
import EditDepartureFlight from './EditDepartureFlight'
import EditReturnFlight from './EditReturnFlight'
import EditModal from './EditModal'


const api = 'http://localhost:8000';

//THROUGH PROFILE PATH?
export default function EditBooking(props) {

    let history = useHistory();
    const location = useLocation();

    const [booking, setBooking] = React.useState(location.state.booking);

    const [depFlightDepDate, setDepDate] = useState(location.state.date);
    const [retFlightDepDate, setRetDate] = useState(location.state.returnDate);

    const [depFlightArrDate, setArrDep] = useState(location.state.arrDep);
    const [retFlightArrDate, setArrRet] = useState(location.state.arrRet);

    const [depFlightDepTime, setDepFDepT] = useState(location.state.depFlightDepTime);
    const [depFlightArrTime, setDepFArrT] = useState(location.state.depFlightArrTime);

    const [retFlightDepTime, setRetFDepT] = useState(location.state.retFlightDepTime);
    const [retFlightArrTime, setRetFArrT] = useState(location.state.retFlightArrTime);

    const [departureFlight, setDepartureFlight] = React.useState({});
    const [returnFlight, setReturnFlight] = React.useState({});

    const [showEditDep, setShowEditDep] = useState(false);
    const [showEditRet, setShowEditRet] = useState(false);

    const[DepCabinClass,setDepCabinClass]=useState(location.state.booking.DepCabinClass);
    const[RetCabinClass,setRetCabinClass]=useState(location.state.booking.RetCabinClass);
    
    useEffect(() => {
        console.log("BANANAAA")
        let x=findDepartureFlight(booking.DepartureFlight,booking.ReturnFlight);
       // let y=findReturnFlight(booking.ReturnFlight);
    }, [])

    useEffect(() => {
        console.log(showEditDep);
    }, [showEditDep])


    const flightsAvailable = () => {
        axios.post(`${api}/searchFlights`, {
            FromAirport: departureFlight.FromAirport.toUpperCase(),
            ToAirport: departureFlight.ToAirport.toUpperCase(),
            DepDate: depFlightDepDate,
            RetDate: retFlightDepDate
        }).then((res) => {
            let flightsWithReturn = res.data;
            let flights = flightsWithReturn.map((tuple, i) => (
                tuple.DepFlight
            ))
            console.log(flightsWithReturn);
            flightsWithReturn = flightsWithReturn.filter(tuple => tuple.DepFlight.SeatsList.Available.filter(seat => seat.charAt(0) === booking.DepCabinClass).length >= booking.NumberOfPassengers)
            flightsWithReturn = filterReturnFlights(flightsWithReturn);
            console.log("BOOKING");
            console.log(booking);
            history.push({
                pathname: 'changeFlight',
                state: { bookingInfo: booking, flightsWithReturn: flightsWithReturn, RetDate: retFlightDepDate, DepCabinClass: booking.DepCabinClass, RetCabinClass: booking.RetCabinClass, PassengersNumber: booking.NumberOfPassengers, AdultPassengers: booking.AdultPassengers, KidPassengers: booking.KidPassengers }
            });
        }).catch((error) => {
            if (error) {
                console.log(error);
            }
        })
    }

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();


    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    const filterReturnFlights = (flightsWithReturn) => {
        let result = []
        flightsWithReturn.forEach(tuple => {
            let dep = tuple.DepFlight;
            let retList = tuple.ReturnFlights;
            let filteredRetList = retList.filter(ret => ret.SeatsList.Available.filter(seat => seat.charAt(0) === booking.RetCabinClass).length >= booking.NumberOfPassengers);
            if (filteredRetList.length !== 0) {
                let newTuple = {
                    DepFlight: dep,
                    ReturnFlights: retList
                }
                result = [...result, newTuple];
            }
        });
        return result;
    }

    function findDepartureFlight(depid,retid) {
        axios.get(`${api}/user/flight/show/${depid}`)
            .then((res) => {
                let depFlight = res.data;
                setDepartureFlight(depFlight);
                axios.get(`${api}/user/flight/show/${retid}`)
                    .then((response) => {
                        let retFlight = response.data;
                        setReturnFlight(retFlight);
                        setBooking({
                            ...booking,
                            DepartureFlight: depFlight,
                            ReturnFlight: retFlight
                        })
                    })
                    .catch((error) => {
                        if (error) {
                            console.log(error);
                        }
                    })
            
                return depFlight;
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            })
    }

    function findReturnFlight(id) {
        axios.get(`${api}/user/flight/show/${id}`)
            .then((res) => {
                let retFlight = res.data;
                setReturnFlight(retFlight);
                // let depdateString = retFlight.DepDate.split('T')[0];editBooking
                //let arrdateString = flight.ArrDate.split('T')[0];

                console.log("RETURN FLIGHT");
                console.log(returnFlight);
                console.log(retFlightDepDate);

                // setBooking({
                //     ...booking,
                //     ReturnFlight: retFlight
                // })
                
                return retFlight;
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            })
    }
    function getClass(cabin) {
        if (cabin === 'E') {
            return 'Economy'
        }
        else if (cabin === 'F') {
            return 'First'
        }
        else if (cabin === 'B') {
            return 'Business'
        }
        return 'Error in getClass()';
    }

    function editDepartureFlight() {
        history.push({ //PASS RETURN FLIGHT??????????? //, date: date, returnDate: returnDate, arrDep: arrDep, arrRet: arrRet,depFlightDepTime: depFlightDepTime,depFlightArrTime:depFlightArrTime,retFlightDepTime: retFlightDepTime, retFlightArrTime: retFlightArrTime
            pathname: '/editDepartureFlight',
            state: { departureFlight: departureFlight, returnFlight: returnFlight, booking: booking, depFlightDepDate: depFlightDepDate, retFlightDepDate: retFlightDepDate }

        });

    }

    function editReturnFlight() {
        history.push({
            pathname: '/editReturnFlight', //, date: date, returnDate: returnDate, arrDep: arrDep, arrRet: arrRet,retFlightDepTime: retFlightDepTime, retFlightArrTime: retFlightArrTime
            state: { returnFlight: returnFlight, booking: booking }

        });

    }

    return (
        <div> <br />
            <Container>

                {showEditDep &&
                    //<EditModal setShow={setShow} showEditDep={showEditDep} />
                    <div>
                        <Modal
                            backdrop="static"
                            keyboard={false}
                            show={showEditDep}
                            onHide={() => setShowEditDep(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Departure Flight</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form id='searchForm' onSubmit={(e) => {
                                    e.preventDefault();
                                    //setSpinner(true);
                                    setTimeout(flightsAvailable, 2000);
                                }}>
                                    <br />
                                    <Container id='searchContainer'>

                                        <div className="pos-center text-primary" style={{ width: '100px', height: '100px', zIndex: '20' }} >

                                        </div>

                                        <Form.Group className="mb-3" controlId="Airports">
                                            <Row>
                                                <Col xs={5}>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>From</InputGroup.Text>

                                                        <Form.Control
                                                            type="text"
                                                            value={departureFlight.FromAirport}
                                                            required
                                                            editable={false}
                                                        //onChange={(e) => setFromAirport(e.target.value)}
                                                        />

                                                    </InputGroup>
                                                </Col>
                                                <Col xs={5}>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>To</InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            value={departureFlight.ToAirport}
                                                            required
                                                            editable={false}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        <Row className="align-items">
                                            <Col xs={5}>
                                                <Form.Group controlId="formGridDepartue">
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>Departure</InputGroup.Text>

                                                        <Form.Control
                                                            type="date"
                                                            value={depFlightDepDate}
                                                            name="DepDate"
                                                            min={today}
                                                            required
                                                            onChange={(e) => setDepDate(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={5}>
                                                <Form.Group controlId="formGridCabin">
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>Departure Class</InputGroup.Text>
                                                        <Form.Select
                                                            name="DepCabinClass"
                                                            placeholder={booking.DepCabinClass}
                                                            required
                                                            onChange={(e) => setDepCabinClass(e.target.value)}
                                                        >
                                                            <option value="E">Economy</option>
                                                            <option value="B">Business</option>
                                                            <option value="F">First Class</option>
                                                        </Form.Select>
                                                    </InputGroup>

                                                </Form.Group>
                                            </Col>
                                        </Row>

                                            {/* <Button className="btn btn-home" type="submit"> Search</Button> */}

                                        <br />

                                    </Container>
                                </Form>

                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button variant="secondary" onClick={() => setShowEditDep(false)}>
                                    Close
                                </Button> */}

                                <Button
                                    variant="primary"
                                    //onClick={showPayModal}
                                    onClick={flightsAvailable}
                                >
                                    Search
                                 </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                }

                <Row>
                    <Col md="6">

                        <Card style={{ width: '25rem' }, { margin: '15px' }}>
                            <Card.Body>
                                <Card.Title >Outbound  <i className="fas fa-plane-departure">  </i> </Card.Title>
                                <hr />
                                <hr />

                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>Departure:  </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{depFlightDepDate} <br />{depFlightDepTime} </Card.Subtitle>
                                    </Col>
                                    <Col md="auto">
                                        <Card.Title>Arrival:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{depFlightArrDate} <br />{depFlightArrTime} </Card.Subtitle>
                                    </Col>
                                </Row>


                                <hr />
                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>From:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{departureFlight.FromAirport} </Card.Subtitle>

                                    </Col>

                                    <Col md="auto">
                                        <Card.Title>To:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{departureFlight.ToAirport} </Card.Subtitle>
                                    </Col>
                                </Row>
                                <br />
                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>Cabin:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{getClass(booking.DepCabinClass)} </Card.Subtitle>
                                    </Col>
                                    <Col md="auto">
                                        <Card.Title>Seat(s):</Card.Title>
                                        <Card.Subtitle style={{ textAlign: 'center' }} className="mb-2 text-muted">{booking.DepSeats.toString()} </Card.Subtitle>

                                        <Button variant="warning" size="sm" onClick={() => { }}> Change </Button>

                                    </Col>

                                </Row>

                            </Card.Body>
                            <Row>
                                <Button style={{ marginLeft: '12px', borderRadius: '0 0 4px 4px' }} onClick={() => setShowEditDep(true)} > Edit </Button>
                            </Row>
                        </Card>
                    </Col>

                    <Col md="6">

                        <Card style={{ width: '25rem' }, { margin: '15px' }}>
                            <Card.Body>
                                <Card.Title >Inbound  <i className="fas fa-plane-arrival">  </i> </Card.Title>
                                <hr />
                                <hr />

                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>Departure:  </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{retFlightDepDate} <br /> {retFlightDepTime} </Card.Subtitle>
                                    </Col>
                                    <Col md="auto">
                                        <Card.Title>Arrival:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{retFlightArrDate}<br /> {retFlightArrTime} </Card.Subtitle>
                                    </Col>
                                </Row>

                                <hr />
                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>From:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{returnFlight.FromAirport} </Card.Subtitle>

                                    </Col>

                                    <Col md="auto">
                                        <Card.Title>To:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{returnFlight.ToAirport} </Card.Subtitle>
                                    </Col>
                                </Row>
                                <br />
                                <Row className='row-invoice'>
                                    <Col md="auto">
                                        <Card.Title>Cabin:</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{getClass(booking.RetCabinClass)} </Card.Subtitle>
                                    </Col>
                                    <Col md="auto">
                                        <Card.Title>Seat(s):</Card.Title>
                                        <Card.Subtitle style={{ textAlign: 'center' }} className="mb-2 text-muted">{booking.RetSeats.toString()} </Card.Subtitle>
                                        <Button variant="warning" size="sm" onClick={() => { }}> Change </Button>

                                    </Col>
                                </Row>

                            </Card.Body>
                            <Row>
                                <Button style={{ marginLeft: '12px', borderRadius: '0 0 4px 4px' }} onClick={editReturnFlight} >Edit </Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    );

}