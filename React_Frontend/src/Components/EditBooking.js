import React,{useEffect,useState } from 'react';
import {Container, Card, Row,Col,Button,Alert } from 'react-bootstrap'
import { useHistory,useLocation } from "react-router-dom";
import ChangeSeats from './ChangeSeats';
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

    const [alert, setAlert] = useState({msg:'', show:false});
    
    const[dep,setDep]=React.useState('false');
    const[ret,setRet]=React.useState('false');
    const [departureFlight, setDepartureFlight]=React.useState({});
    const [returnFlight, setReturnFlight]=React.useState({});

    const [depSeats, setDepSeats] = useState();

    const [mainView,setMainView] = useState("main");

    useEffect(() => {
        findDepartureFlight(booking.DepartureFlight);
        findReturnFlight(booking.ReturnFlight);
    }, [])

     function showAlert(message,show){
        setAlert({
            msg: message,
            show: show
        });
    }
    
    function findDepartureFlight(id) {
        axios.get(`${api}/user/flight/show/${id}`)
        .then((res)=>{
            let depFlight=res.data;
            setDepartureFlight(depFlight);
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


    function setRetSeats(seats){
        
    }
    
    return(
         <div>
        {alert.show && (
          <Alert variant="warning" onClose={() => setAlert(false)} dismissible>
            {alert.msg}
          </Alert>
        )}
              <br/>
                 {mainView === "main" && <Container>
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
                             <Card.Subtitle className="mb-2 text-muted">{departureFlight.FromAirport} </Card.Subtitle>
                   
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
                             
                             <Button variant="warning" size="sm" onClick={() => {setMainView("changeDepSeats")}}> Change </Button>

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
                             
                             <Button variant="warning" size="sm" onClick={() => {setMainView("changeRetSeats")}}> Change </Button>

                         </Col>
                     </Row>

                 </Card.Body>
                 </Card>
             </Col>
            </Row>
         </Container>}
         { 
            mainView === "changeDepSeats" && 
            <Container>
                <ChangeSeats type='Dep' booking={booking} NumberOfPassengers = {booking.NumberOfPassengers} setMainView={setMainView} flight = {departureFlight} cabin = {booking.DepCabinClass} chosenSeats = {booking.DepSeats} showAlert={showAlert} />
            </Container>
         }

          { 
            mainView === "changeRetSeats" && 
            <Container>
                <ChangeSeats type='Ret' booking={booking} NumberOfPassengers = {booking.NumberOfPassengers} setMainView={setMainView} flight = {returnFlight} cabin = {booking.RetCabinClass} chosenSeats = {booking.RetSeats} showAlert={showAlert} />
            </Container>
         }
      
        </div>
    );

}