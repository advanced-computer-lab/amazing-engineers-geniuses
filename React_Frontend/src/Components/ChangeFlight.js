import React,{  useEffect,useState } from 'react';
import axios from 'axios';
import {Container, Alert} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import ChooseSeats from './ChooseSeats';
import ChangeSeats from './ChangeSeats';
import Invoice from './Invoice';



export default function ChangeFlight(props){
    const location = useLocation();
    const [display,setDisplay] = useState('depF');
    const [edit,setEdit] = useState('F');
    const [bookingInfo,setBookingInfo] = useState(location.state.bookingInfo)
    const [alert, setAlert] = useState({msg:'', show:false});
    const [depSeats,setDepSeats] = useState();
    // const [retSeats,setRetSeats] = useState();
    
      
    
    
    function showAlert(message,show){
      setAlert({
          msg: message,
          show: show
      });
  }


    //const[booking,setBooking]=useState(location.state.booking);

    // function setDepF(flight,returnFlights){
    //     const cabin = getClass2(booking.DepCabinClass);
    //     let price = flight.Price[cabin] * booking.AdultPassengers + (flight.Price[cabin] / 2) * booking.KidPassengers;
    //     //setDepPrice(price);
    //     console.log('price dep',price);
    //     //setBookingInfo({...bookingInfo,DepartureFlight: flight,TotalCost: price });
    //     setAvailableReturnFlights(returnFlights);
    //     //getNext('depF');
    // }
    
    // function setDepSeats(seats){
    //     setBookingInfo({...bookingInfo, DepSeats: seats})
    // }

    // function setRetSeats(seats){
    //     setBookingInfo({...bookingInfo, RetSeats: seats})
    // }
    
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
    //setDepF={setDepF}
    
    // function edit(){
    //     setEdit('T');
    
    // }
    
    return(
    <Container>
     {alert.show && (
          <Alert variant="warning" onClose={() => setAlert(false)} dismissible>
            {alert.msg}
          </Alert>
        )}
        <br/>
        {display === "depF" && location.state.flightsWithReturn.length !== 0 &&(
              <AvailableFlights
                bookingInfo={bookingInfo}
                edit={true}
                setDisplay = {setDisplay}
              />
            )}
            {display === "chooseDepSeats"  &&<ChangeSeats setDisplay={setDisplay} type='Dep' changingFlight={true} setSeats={setDepSeats} booking={bookingInfo} NumberOfPassengers = {bookingInfo.NumberOfPassengers} flight = {bookingInfo.DepartureFlight} cabin = {bookingInfo.DepCabinClass} chosenSeats = {bookingInfo.DepSeats} showAlert={showAlert}  />}
            
            {location.state.flightsWithReturn.length === 0 && <h1>No Flights Available</h1>}
            {/* {
              display === "retF" && availableReturnFlights.length !== 0 && (
                <AvailableReturnFlights
                  rFs={availableReturnFlights}
                  departureFlight={booking.DepartureFlight}
                  CabinClass={booking.RetCabinClass}
                />
              )
            } */}

            {display === 'Invoice' && <Invoice bookingInfo={bookingInfo} />}
    </Container>
    
    
    );

}
