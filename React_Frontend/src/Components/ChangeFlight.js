import React,{  useEffect,useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import ChooseSeats from './ChooseSeats';

export default function ChangeFlight(props){
    const location = useLocation();
    const [display,setDisplay] = useState('depF');
    const [edit,setEdit] = useState('F');
    const [bookingInfo,setBookingInfo] = useState(location.state.bookingInfo)
    // const [depSeats,setDepSeats] = useState();
    // const [retSeats,setRetSeats] = useState();


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
        <br/>
        {display === "depF" && location.state.flightsWithReturn.length !== 0 &&(
              <AvailableFlights
                bookingInfo={bookingInfo}
                edit={true}
                setDisplay = {setDisplay}
              />
            )}
                  {/* bookingInfo={bookingInfo}
                  showAlert={showAlert}
                  setDepSeats={setDepSeats}
                  setRetSeats={setRetSeats}
                  depClass={bookingInfo.DepCabinClass}
                  retClass={bookingInfo.RetCabinClass} */}
            {display === "chooseSeats" && <ChooseSeats  bookingInfo={bookingInfo} depClass={bookingInfo.DepCabinClass}
                  retClass={bookingInfo.RetCabinClass}/>}
            
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
    </Container>
    
    
    );

}
