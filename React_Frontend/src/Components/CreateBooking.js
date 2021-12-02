import React,{ Component, useEffect,useState } from 'react';
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import {Container, Row, Col, Alert,Button, Modal} from 'react-bootstrap';
import ChooseSeats from './ChooseSeats';
import FlightSummary from './FlightSummary';
import { useLocation,useHistory } from "react-router-dom";
import Auth from '../services/Auth';
import axios from 'axios';

const api = 'http://localhost:8000';

export default function CreateBooking(props){
    const location = useLocation();
    const history = useHistory();

    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser())
    const [display,setDisplay] = useState('depF');
    const [availableReturnFlights, setAvailableReturnFlights] = useState([])
    const [alert, setAlert] = useState({msg:'', show:false});
    const [msg, setMsg] = useState('');
    const [showConfirm, setConfirm] = useState(false);
    const [cb,setCb] = useState('Econ');

    const [bookingInfo, setBookingInfo] = useState({
        DepartureFlight: {},
        ReturnFlight: {},
        CabinClass: location.state.CabinClass,
        DepSeats:[],
        RetSeats:[],
        NumberOfPassengers: location.state.PassengersNumber,
        TotalCost: 0
    })

    useEffect(() => {
        getClass();
    }, []);

    const getNext = (daState)=>{
        if(daState === 'depF'){
            setDisplay('retF')
        }
        else if (daState === 'retF'){
            setDisplay('seats')
        }
        else if(daState === 'seats'){
            console.log('last step');
        }
    }

    function setDepF(flight,returnFlights){
        //console.log(flight.Price[cb]);
        setBookingInfo({...bookingInfo,DepartureFlight: flight,TotalCost: flight.Price[cb] * bookingInfo.NumberOfPassengers});
        setAvailableReturnFlights(returnFlights);
        getNext('depF');
    }

    function setRetF(flight){
        let price = bookingInfo.TotalCost + (flight.Price[cb] * bookingInfo.NumberOfPassengers);
        setBookingInfo({...bookingInfo,ReturnFlight: flight,TotalCost: price});
        getNext('retF');
    }

    function setDepSeats(seats){
        setBookingInfo({...bookingInfo, DepSeats: seats})
    }

    function setRetSeats(seats){
        setBookingInfo({...bookingInfo, RetSeats: seats})
    }

    function getClass() {
        if(bookingInfo.CabinClass ==='E'){
            setCb('Econ');
        }
        else if(bookingInfo.CabinClass === 'F'){
            setCb('First');
        }
        else if (bookingInfo.CabinClass === 'B'){
            setCb('Bus');
        }
    }
    
    function showConfirmModal(){
        if(currentUser.username === 'Guest'){
           setAlert({
            msg: 'You must be logged in',
            show: true
        });
            return;
        }
        setConfirm(true);
    }
    
    function showAlert(message,show){
        setAlert({
            msg: message,
            show: show
        });
    }

    function createBooking(){
        console.log(currentUser.id);
        axios.post(`${api}/createBooking`,{...bookingInfo, UserId: currentUser.id})
        .then((res)=>{
            console.log("XXXXXXXXX");
            console.log(res.data);
            setConfirm(false);
            history.push('/');
        })
        .catch((error)=>{
            if(error){
                console.log(error);
            };
        })

    }

    return(
        <Container>
            {alert.show && <Alert variant='warning' onClose={() => setAlert(false)} dismissible>
                {alert.msg}
            </Alert>}
            <Row xs={12}>
                <Col xs={9}>
                    {display === 'depF' &&
                        <AvailableFlights setDepF={setDepF} CabinClass = {bookingInfo.CabinClass}/>
                    }
                    {display === 'retF' && availableReturnFlights.length !== 0 &&
                        <AvailableReturnFlights setRetF={setRetF} rFs={availableReturnFlights} departureFlight={bookingInfo.DepartureFlight} CabinClass = {bookingInfo.CabinClass}/>
                       // <AvailableReturnFlights rFs={availableReturnFlights}/>
                    }
                    {display === 'seats' &&
                        <ChooseSeats bookingInfo={bookingInfo} showAlert={showAlert} setDepSeats={setDepSeats} setRetSeats={setRetSeats}/>
                        // <Button></Button>
                    }
                </Col>
                <Col xs={3}>
                    <FlightSummary bookingInfo={bookingInfo} showConfirm={showConfirmModal} />
                </Col>
            </Row>

            <Modal
                show={showConfirm}
                onHide={() => setConfirm(false)}
              backdrop="static"
              keyboard={false}
            >

          <Modal.Header closeButton>
            <Modal.Title>Booking Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to book this trip?
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setConfirm(false)}
            >
              Close
                </Button>

            <Button
              variant="primary"
              onClick={createBooking} //CREATE BOOKING
            >
              Confirm
                </Button>
          </Modal.Footer>
        </Modal>
         </Container>
    )

}   