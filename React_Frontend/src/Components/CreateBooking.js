import React,{  useEffect,useState } from 'react';
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import { Row, Col, Alert,Button, Modal, Spinner,Container} from 'react-bootstrap';
import ChooseSeats from './ChooseSeats';
import FlightSummary from './FlightSummary';
import { useLocation,useHistory } from "react-router-dom";
import Auth from '../services/Auth';
import axios from 'axios';
import Pay from './Pay';
import Invoice from './Invoice';
import '../Styles/CreateBooking.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const api = 'http://localhost:8000';

export default function CreateBooking(props){
    const location = useLocation();
    const history = useHistory();

    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser())
    const [display,setDisplay] = useState('depF');
    const [availableReturnFlights, setAvailableReturnFlights] = useState([])
    const [alert, setAlert] = useState({msg:'', show:false});
    const [showConfirm, setConfirm] = useState(false);
    const [showPay, setPay] = useState(false);
    const [showSummary, setSummary] = useState(true);
    const [showSpinner, setSpinner] = useState(false);
    const[showDepBread,setDepBread]= useState(true);
    const[showRetBread,setRetBread]= useState(false);
    const[showSeatBread,setSeatBread]= useState(false);
    
    const [bookingInfo, setBookingInfo] = useState({
        bID: '',
        DepartureFlight: {},
        ReturnFlight: {},
        DepCabinClass: location.state.DepCabinClass,
        RetCabinClass: location.state.RetCabinClass,
        DepSeats:[],
        RetSeats:[],
        NumberOfPassengers: location.state.PassengersNumber,
        AdultPassengers: location.state.AdultPassengers,
        KidPassengers: location.state.KidPassengers,
        TotalCost: 0
    })

    useEffect(() => {
      setSpinner(false);
    }, [display]);

    const getNext = (daState)=>{
        setAlert({msg:'', show:false});
        setSpinner(true);
        setTimeout(()=>{
          if(daState === ''){
            setDisplay('depF');
            setDepBread(true);
            setRetBread(false);
            setSeatBread(false);
          }
          else if(daState === 'depF'){
            setDisplay('retF');
            setDepBread(true);
            setRetBread(true);
            setSeatBread(false);

          }
          else if (daState === 'retF'){
              setDisplay('seats');
              setDepBread(true);
              setRetBread(true);
              setSeatBread(true);
              

          }
          else if(daState === 'seats'){
            setDisplay('invoice');
            setDepBread(false);
            setRetBread(false);
            setSeatBread(false);
          }
          
        }, 2000);
    }


    function setDepF(flight,returnFlights){
        const cabin = getClass2(bookingInfo.DepCabinClass);
        let price = flight.Price[cabin] * bookingInfo.AdultPassengers + (flight.Price[cabin] / 2) * bookingInfo.KidPassengers;
        console.log('price dep',price);
        setBookingInfo({...bookingInfo,DepartureFlight: flight,TotalCost: price });
        setAvailableReturnFlights(returnFlights);
        getNext('depF');
    }

    function add(){
        let pass = Number.parseInt(bookingInfo.AdultPassengers) + Number.parseInt(bookingInfo.KidPassengers);
        setBookingInfo({...bookingInfo,NumberOfPassengers: pass})
        return pass;
    }

    function setRetF(flight){
        const cabin = getClass2(bookingInfo.RetCabinClass);
        let price =
          bookingInfo.TotalCost +
          flight.Price[cabin] *
            bookingInfo.AdultPassengers +
          (flight.Price[cabin] / 2) *
            bookingInfo.KidPassengers;
        setBookingInfo({...bookingInfo,ReturnFlight: flight,TotalCost: price});
        getNext('retF');
    }

    function setDepSeats(seats){
        setBookingInfo({...bookingInfo, DepSeats: seats})
    }

    function setRetSeats(seats){
        setBookingInfo({...bookingInfo, RetSeats: seats})
    }

    function getClass2(CabinClass){
        if(CabinClass ==='E'){
            return 'Econ';
        }
        else if(CabinClass === 'F'){
            return 'First';
        }
        else if (CabinClass === 'B'){
            return 'Bus';
        }
        return 'Error in getClass()';
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

    function showPayModal(){
        setConfirm(false);
        setPay(true);
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
            setPay(false);
            setSummary(false);
            getNext('seats');
            console.log(res.data._id);
            setBookingInfo({...bookingInfo, bID: res.data._id});
           
        })
        .catch((error)=>{
            if(error){
                console.log(error);
            };
        })
       
        
    }

    return (
      <Container>
        <Row>
         <Breadcrumb className="breadcrumb" >
            <Breadcrumb.Item className="breadcrumb__item" onClick={() => history.push('/') }> Home </Breadcrumb.Item>

           {showDepBread && 
           <Breadcrumb.Item id='secondbread' className="breadcrumb__item" onClick={() => getNext('') }> Departure Flight </Breadcrumb.Item>}
           
           { showRetBread && 
           <Breadcrumb.Item id='secondbread' className="breadcrumb__item" onClick={() => getNext('depF')}> Return Flight</Breadcrumb.Item>}
           
           { showSeatBread &&
             <Breadcrumb.Item  className="breadcrumb__item" onClick={() => getNext('retF')}>Seats</Breadcrumb.Item>}
         </Breadcrumb> 
        </Row>

        {alert.show && (
          <Alert variant="warning" onClose={() => setAlert(false)} dismissible>
            {alert.msg}
          </Alert>
        )}
        <Row xs={12}>
          <Col xs={8}>
       
            {showSpinner && 
            <div className="pos-center text-primary" style={{width: '100px', height: '100px'}} >   
              <Spinner animation="border" />
              <span >Loading...</span>
              {/* </Spinner> */}
            </div>}

            {/* {showSpinner &&<Row>
              <Col xs={5}></Col>
              <Col><Spinner style={{alignItems: 'center'}} animation='border'/></Col>
            </Row> } */}
            {display === "depF" && location.state.flightsWithReturn.length !== 0 && showSpinner === false &&(
              <AvailableFlights
                setDepF={setDepF}
                CabinClass={bookingInfo.DepCabinClass}
              />
            )}
            {location.state.flightsWithReturn.length === 0 && <h1>No Flights Available</h1>}
            {
              display === "retF" && showSpinner === false && availableReturnFlights.length !== 0 && (
                <AvailableReturnFlights
                  setRetF={setRetF}
                  rFs={availableReturnFlights}
                  departureFlight={bookingInfo.DepartureFlight}
                  CabinClass={bookingInfo.RetCabinClass}
                />
              )
              // <AvailableReturnFlights rFs={availableReturnFlights}/>
            }
            {
              display === "seats" && showSpinner === false &&(
                <ChooseSeats
                  bookingInfo={bookingInfo}
                  showAlert={showAlert}
                  setDepSeats={setDepSeats}
                  setRetSeats={setRetSeats}
                  depClass={bookingInfo.DepCabinClass}
                  retClass={bookingInfo.RetCabinClass}
                />
              )
              // <Button></Button>
            }
          </Col>
          {display === "invoice" && <Invoice bookingInfo={bookingInfo} />}
          {showSummary && (
            <Col xs={4} style={{textAlign:'center'}}>
              <FlightSummary
                bookingInfo={bookingInfo}
                showConfirm={showConfirmModal}
              />
            </Col>
          )}
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

          <Modal.Body>Are you sure you want to book this trip?</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Close
            </Button>

            <Button
              variant="primary"
              //onClick={showPayModal} //CREATE BOOKING
              onClick={() => {
                setAlert({msg:'', show:false});
                showPayModal();
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Pay
          show={showPay}
          Book={createBooking}
          onHide={() => {
            setPay(false);
          }}
        />
      </Container>
    );

}   