import React,{useEffect,useState } from 'react';
import {Container, Card, Row,Col,Button } from 'react-bootstrap'
import { useHistory,useLocation } from "react-router-dom";
import BookingItem from './BookingItem';
import Booking from './Booking';
//const Flight = require('../models/Flight');
import axios from 'axios';

const api = 'http://localhost:8000';

//THROUGH PROFILE PATH?
export default function EditBooking(props){
    
    let history = useHistory();
    const location = useLocation();

    const [booking,setBooking]= React.useState(location.state.booking);
    
    const [fromAirport, setFromAirport] = useState(location.state.fromAirport);
    const [toAirport, setToAirport] = useState(location.state.toAirport);
    
    const [date, setDate] = useState(location.state.date);
    const [returnDate, setRetDate] = useState(location.state.returnDate);
    
    const [arrDep, setArrDep] = useState(location.state.arrDep);
    const [arrRet, setArrRet] = useState(location.state.arrRet);
    
    const[depFlightDepTime,setDepFDepT]= useState(location.state.depFlightDepTime);
    const[depFlightArrTime,setDepFArrT]= useState(location.state.depFlightArrTime);
    
    const[retFlightDepTime,setRetFDepT]= useState(location.state.retFlightDepTime);
    const[retFlightArrTime,setRetFArrT]= useState(location.state.retFlightArrTime);
    
    const[dep,setDep]=React.useState('false');
    const[ret,setRet]=React.useState('false');
    const [departureFlight, setDepartureFlight]=React.useState({});
    const [returnFlight, setReturnFlight]=React.useState({});
    // const [departureFlight, setDepartureFlight]=React.useState({
    //     FlightNumber: 0,
    //     Departure: '',
    //     DepDate: '',
    //     Arrival: '',
    //     ArrDate: '',
    //     EconomySeats: 0,
    //     BusinessSeats: 0,
    //     FirstClassSeats: 0,
    //     FromAirport: '',
    //     ToAirport: '',
    //     Terminal: 0,
    //     EconPrice: 0,
    //     BusPrice: 0,
    //     FirstPrice: 0,
    //     EconBag: 0,
    //     BusBag: 0,
    //     FirstBag: 0
    
    // })
    
    // let depFlight={};
    // let retFlight={};
    
       function findDepartureFlight(id) {
        axios.get(`${api}/user/flight/show/${id}`)
        .then((res)=>{
            let depFlight=res.data;
            //let depdateString = flight.DepDate.split('T')[0];   
            //let arrdateString = flight.ArrDate.split('T')[0];  
            
            console.log("DEPARTURE FLIGHT");
            console.log(depFlight);

            console.log("DEPARTURE date");
            console.log(depFlight.DepDate);
            
            setDepartureFlight(depFlight);
            console.log("DEPARTURE FLIGHT state");
            console.log(departureFlight);
            
            //setDepartureFlight({ ...departureFlight, value: flight })

            // setDepartureFlight({
            //     FlightNumber: flight.FlightNumber,
            //     Departure: flight.Departure.AsString,
            //     DepDate: depdateString,
            //     Arrival: flight.Arrival.AsString,
            //     ArrDate: arrdateString,
            //     EconomySeats: flight.EconomySeats,
            //     BusinessSeats: flight.BusinessSeats,
            //     FirstClassSeats: flight.FirstClassSeats,
            //     FromAirport: flight.FromAirport,
            //     ToAirport: flight.ToAirport,
            //     Terminal: flight.Terminal,
            //     EconPrice: flight.Price.Econ,
            //     BusPrice: flight.Price.Bus,
            //     FirstPrice: flight.Price.First,
            //     EconBag: flight.BaggageAllowance.Econ,
            //     BusBag: flight.BaggageAllowance.Bus,
            //     FirstBag: flight.BaggageAllowance.First
            // })
            
            //let depFlight= flight;
            //console.log(departureFlight);
            
            return depFlight;
        })
        .catch((error) =>{
            if(error){
                console.log(error);
            }
        })
    }
    
    function findReturnFlight(id) {
        axios.get(`${api}/user/flight/show/${id}`)
        .then((res)=>{
            let retFlight=res.data;
            //let depdateString = retFlight.DepDate.split('T')[0];   
            //let arrdateString = flight.ArrDate.split('T')[0];  
            
            console.log("RETURN FLIGHT");
            console.log(retFlight);

            setReturnFlight(retFlight);
            
            return retFlight;
        })
        .catch((error) =>{
            if(error){
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
    
    //var returnFlight = findFlight(booking.ReturnFlight);
    
    // setDepartureFlight(findDepartureFlight(booking.DepartureFlight));
    // setReturnFlight(findFlight(booking.ReturnFlight));
    
    // let dp=findDepartureFlight(booking.DepartureFlight);
    // console.log(dp);
    
    //findDepartureFlight(booking.DepartureFlight);
    //findReturnFlight(booking.ReturnFlight);
    
    return(
         <div> <br/>
                 <Container>
                 <Row>
                 <Col md="6">

                 <Card style={{ width: '25rem' } ,{margin: '15px'} }>
                     <Card.Body>
                     <Card.Title >Outbound  <i className="fas fa-plane-departure">  </i></Card.Title>
                     <hr/>
                     <hr/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                             <Card.Title>Departure:  </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{date} <br/> {depFlightDepTime} </Card.Subtitle>
                        </Col>
                         <Col md="auto">                           
                         <Card.Title>Arrival:</Card.Title>
                         <Card.Subtitle className="mb-2 text-muted">{arrDep} <br/> {depFlightArrTime} </Card.Subtitle>
                         </Col>
                     </Row>
                     <hr/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                             <Card.Title>From:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{fromAirport} </Card.Subtitle>
                   
                         </Col>
                
                        <Col md="auto">
                             <Card.Title>To:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{toAirport} </Card.Subtitle>
                         </Col>
                     </Row>
                     <br/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                            <Card.Title>Cabin:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{getClass(booking.DepCabinClass)} </Card.Subtitle>
                         </Col>
                         <Col md="auto">
                             <Card.Title>Seat(s):</Card.Title>
                             <Card.Subtitle style={{textAlign: 'center'}} className="mb-2 text-muted">{booking.DepSeats.toString()} </Card.Subtitle>
                             
                             <Button variant="warning" size="sm" onClick={() => {}}> Change </Button>

                         </Col>
                         
                     </Row>

                 </Card.Body>
                 </Card>
                 </Col>

                 <Col md="6">

                 <Card style={{ width: '25rem' } ,{margin: '15px'} }>
                 <Card.Body>
                     <Card.Title >Inbound  <i className="fas fa-plane-arrival">  </i></Card.Title>
                     <hr/>
                     <hr/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                             <Card.Title>Departure:  </Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{returnDate} <br/> {retFlightDepTime} </Card.Subtitle>
                         </Col>
                         <Col md="auto">
                             <Card.Title>Arrival:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{arrRet} <br/>  {retFlightArrTime} </Card.Subtitle>
                         </Col>
                     </Row>
                     <hr/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                             <Card.Title>From:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{toAirport} </Card.Subtitle>
                    
                         </Col>
                
                         <Col md="auto">
                             <Card.Title>To:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{fromAirport} </Card.Subtitle>
                         </Col>
                     </Row>
                     <br/>
                     <Row className='row-invoice'>
                         <Col md="auto">
                             <Card.Title>Cabin:</Card.Title>
                             <Card.Subtitle className="mb-2 text-muted">{getClass(booking.RetCabinClass)} </Card.Subtitle>
                         </Col>
                         <Col md="auto">
                             <Card.Title>Seat(s):</Card.Title>
                             <Card.Subtitle style={{textAlign: 'center'}} className="mb-2 text-muted">{booking.RetSeats.toString()} </Card.Subtitle>
                             
                             <Button variant="warning" size="sm" onClick={() => {}}> Change </Button>

                         </Col>
                     </Row>

                 </Card.Body>
                 </Card>
             </Col>
            </Row>
         </Container>
      
        </div>
    );

}