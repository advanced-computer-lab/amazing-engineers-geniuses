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
          
         <div> 
        {showToast && 
        
            <Toast onClose={()=>setShowToast(false)}>
                <Toast.Header>
                    <strong className="me-auto">Booking Number</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Your Booking Number: {props.bookingInfo.bID} </Toast.Body>
            </Toast>}
          
        </div>
        <h1>Outbound:</h1>
        <Card >
            <ListGroup variant="flush">
                <ListGroup.Item>Departure: {bookingInfo.DepartureFlight.DepDate.split('T')[0]} | {bookingInfo.DepartureFlight.Departure.Hours}:{bookingInfo.DepartureFlight.Departure.Minutes} {bookingInfo.DepartureFlight.Departure.Period} </ListGroup.Item>
                <ListGroup.Item>Arrival: {bookingInfo.DepartureFlight.ArrDate.split('T')[0]} | {bookingInfo.DepartureFlight.Arrival.Hours}:{bookingInfo.DepartureFlight.Arrival.Minutes} {bookingInfo.DepartureFlight.Arrival.Period} </ListGroup.Item>
                <ListGroup.Item>From: {bookingInfo.DepartureFlight.FromAirport} </ListGroup.Item>
                <ListGroup.Item>To: {bookingInfo.DepartureFlight.ToAirport} </ListGroup.Item>
                <ListGroup.Item>Cabin: {getClass(bookingInfo.DepCabinClass)}</ListGroup.Item>
                <ListGroup.Item>Seat(s): {bookingInfo.DepSeats.toString()} </ListGroup.Item>
            </ListGroup>
        </Card>
        <h1>Inbound:</h1>
        <Card >
            <ListGroup variant="flush">
                <ListGroup.Item>Departure: {bookingInfo.ReturnFlight.DepDate.split('T')[0]} | {bookingInfo.ReturnFlight.Departure.Hours}:{bookingInfo.ReturnFlight.Departure.Minutes} {bookingInfo.ReturnFlight.Departure.Period} </ListGroup.Item>
                <ListGroup.Item>Arrival: {bookingInfo.ReturnFlight.ArrDate.split('T')[0]}  | {bookingInfo.ReturnFlight.Arrival.Hours}:{bookingInfo.ReturnFlight.Arrival.Minutes} {bookingInfo.ReturnFlight.Arrival.Period} </ListGroup.Item>
                <ListGroup.Item>From: {bookingInfo.ReturnFlight.FromAirport}: </ListGroup.Item>
                <ListGroup.Item>To: {bookingInfo.ReturnFlight.ToAirport} </ListGroup.Item>
                <ListGroup.Item>Cabin: {getClass(bookingInfo.RetCabinClass)} </ListGroup.Item>
                <ListGroup.Item>Seat(s): {bookingInfo.RetSeats.toString()} </ListGroup.Item>
            </ListGroup>
            <h4> Total Cost: {bookingInfo.TotalCost} <i className="fas fa-dollar-sign"></i> </h4>
        </Card>

        
           

        
    </Container>
          
    );
    
    return(<Invoice/>);
}