import React,{useState,useEffect} from 'react';
import {Button,Row,Col,Container,Card,ListGroup , Toast ,ToastContainer} from 'react-bootstrap';
import FlightSummary from './FlightSummary';

export default function Invoice(props){

    const [bookingInfo, setBookingInfo] = useState(props.bookingInfo);

    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(true);

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
    
    return (
    
       <Container>
          
        {showToast && 
            <Toast onClose={()=>setShowToast(false)}>
                <Toast.Header>
                    <strong className="me-auto">Booking Number</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Your Booking Number: {props.bookingInfo.bID} </Toast.Body>
            </Toast>
            }
            
          
         <Container>
             
          <Row>
              <Col md="auto">

         <Card style={{ width: '25rem' } ,{margin: '15px'} }>
         <Card.Body>
            <Card.Title >Outbound  <i className="fas fa-plane-departure">  </i></Card.Title>
            <hr/>
            <hr/>
            <Row>
                <Col md="auto">
            <Card.Title>Departure:  </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepartureFlight.DepDate.split('T')[0]} <br/> {bookingInfo.DepartureFlight.Departure.Hours}:{bookingInfo.DepartureFlight.Departure.Minutes} {bookingInfo.DepartureFlight.Departure.Period} </Card.Subtitle>
            <Card.Title>Arrival:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepartureFlight.ArrDate.split('T')[0]} <br/>{bookingInfo.DepartureFlight.Arrival.Hours}:{bookingInfo.DepartureFlight.Arrival.Minutes} {bookingInfo.DepartureFlight.Arrival.Period} </Card.Subtitle>
            </Col>
            </Row>
            <hr/>
            <Row>
                <Col md="auto">
            <Card.Title>From:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepartureFlight.FromAirport} </Card.Subtitle>
        
            </Col>
           
            <Col>
            <Card.Title>To:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepartureFlight.ToAirport} </Card.Subtitle>
            </Col>
            </Row>
            <br/>
            <Row>
                <Col md="auto">
            <Card.Title>Cabin:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{getClass(bookingInfo.DepCabinClass)} </Card.Subtitle>
            </Col>
            <Col>
            <Card.Title>Seat(s):</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepSeats.toString()} </Card.Subtitle>
            </Col>
            </Row>

          </Card.Body>
           </Card>
           </Col>

         <Col md="auto">
        <Card style={{ width: '25rem' } ,{margin: '15px'}}>
         <Card.Body>
            <Card.Title>Inbound  <i className="fas fa-plane-arrival"></i></Card.Title>
            <hr/>
            <hr/>
            <Row>
                <Col md="auto">
            <Card.Title>Departure:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.ReturnFlight.DepDate.split('T')[0]} <br/> {bookingInfo.ReturnFlight.Departure.Hours}:{bookingInfo.ReturnFlight.Departure.Minutes} {bookingInfo.DepartureFlight.Departure.Period} </Card.Subtitle>
            <Card.Title>Arrival:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.ReturnFlight.ArrDate.split('T')[0]} <br/> {bookingInfo.ReturnFlight.Arrival.Hours}:{bookingInfo.ReturnFlight.Arrival.Minutes} {bookingInfo.DepartureFlight.Arrival.Period} </Card.Subtitle>
            </Col>
            </Row>
            <hr/>

            <Row>
                <Col md="auto">
            <Card.Title>From:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.ReturnFlight.FromAirport} </Card.Subtitle>
            </Col>
            <Col md="auto">
            <Card.Title>To:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.ReturnFlight.ToAirport} </Card.Subtitle>
            </Col>
            </Row>
            <br/>
            <Row>
                <Col md="auto">
            <Card.Title>Cabin:</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{getClass(bookingInfo.RetCabinClass)} </Card.Subtitle>
            </Col>
            <Col md="auto">
            <Card.Title>Seat(s):</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{bookingInfo.RetSeats.toString()} </Card.Subtitle>
            </Col>
            </Row>
            

        </Card.Body>
        </Card>
        </Col>
        
        
       
        </Row>
        
        </Container>
        <Card.Title> Total Cost: {bookingInfo.TotalCost} <i className="fas fa-dollar-sign"></i> </Card.Title>
        

    </Container>
          
    );
    
    return(<Invoice/>);
}