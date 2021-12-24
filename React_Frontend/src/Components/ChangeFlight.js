import React,{  useEffect,useState } from 'react';
import axios from 'axios';
import {Container, Alert} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import ChooseSeats from './ChooseSeats';
import ChangeSeats from './ChangeSeats';
import Invoice from './Invoice';


const api = 'http://localhost:8000';

export default function ChangeFlight(props){
    const location = useLocation();
    const [display,setDisplay] = useState(location.state.display);
    const [edit,setEdit] = useState('F');
    const [bookingInfo,setBookingInfo] = useState(location.state.bookingInfo)
    const [alert, setAlert] = useState({msg:'', show:false});
    const [depSeats,setDepSeats] = useState();
    const [retSeats,setRetSeats] = useState();
    const [tempFlight,setTempFlight]=useState({});
    const oldBookingInfo=location.state.bookingInfo;
    
    useEffect(() => {
      console.log(display);
  }, [])
    
    
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
    
    const editBooking = ()=>{
      axios.put(`${api}/user/booking/edit`,{
          booking: props.booking,
          oldBookingInfo: oldBookingInfo,
          bookingInfo: bookingInfo
      }).then((res)=>{
          console.log('booking updated');
      }).catch((err)=>console.log(err));
     // props.setMainView("main");
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
        {display === 'Invoice' && <Invoice bookingInfo={bookingInfo} />}
        {display === "depF" && location.state.flightsWithReturn.length !== 0 && (
              <AvailableFlights
                bookingInfo={bookingInfo}
                editDep={true}
                setDisplay = {setDisplay}
                CabinClass={location.state.DepCabinClass}
                setTempFlight={setTempFlight}
              />
            )}
            {display === "chooseDepSeats"  &&<ChangeSeats editBooking={editBooking} tempFlight={tempFlight} editDep={true} depSeats={depSeats} setBookingInfo={setBookingInfo} setDisplay={setDisplay} type='Dep' changingFlight={true} setSeats={setDepSeats} booking={bookingInfo} NumberOfPassengers = {bookingInfo.NumberOfPassengers} flight = {tempFlight} cabin = {location.state.DepCabinClass} chosenSeats = {bookingInfo.DepSeats} showAlert={showAlert}  />}
            
            {/* {location.state.flightsWithReturn.length === 0 && <h1>No Flights Available</h1>} */}
            
            {display === "retF" && (
              <div>
                <AvailableReturnFlights
                  rFs={location.state.returnFlights}
                  CabinClass={bookingInfo.RetCabinClass}
                  editRet={true}
                  setDisplay = {setDisplay}
                  CabinClass={location.state.RetCabinClass}
                  bookingInfo={bookingInfo}
                  setTempFlight={setTempFlight}

                />
                </div> )}
                
            {display === "chooseRetSeats"  &&<ChangeSeats type='Ret'  editBooking={editBooking} tempFlight={tempFlight} ediRet={true} retSeats={retSeats} setBookingInfo={setBookingInfo}  setDisplay={setDisplay} changingFlight={true} setSeats={setRetSeats} booking={bookingInfo} NumberOfPassengers = {bookingInfo.NumberOfPassengers} flight = {tempFlight} cabin = {location.state.RetCabinClass} chosenSeats = {bookingInfo.RetSeats} showAlert={showAlert}  />}
           
    </Container>
    
    
    );

}
