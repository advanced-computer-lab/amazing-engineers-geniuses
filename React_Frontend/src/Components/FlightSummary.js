import React,{ Component, useEffect,useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

export default function FlightSummary(props){

    const [bookingInfo, setBookingInfo] = useState(props.bookingInfo);
    const [cabin,setCabin] = useState('');
    const [cb,setCb] = useState('Econ');
    const [depFlightPrice,setDepFlightPrice]= useState(0);
    const [retFlightPrice,setRetFlightPrice]= useState(0);

    // useEffect(() => {
    //     getClass();
    //     // window.location.reload(false);
    // }, []);

    useEffect(() => {
        setBookingInfo(props.bookingInfo)
    }, [props.bookingInfo]);

    const showConfirm = () => {
        props.showConfirm();
    }

    // function getClass() {
    //     if(bookingInfo.CabinClass ==='E'){
    //         setCabin('Economy');
    //         setCb('Econ');

    //     }
    //     else if(bookingInfo.CabinClass === 'F'){
    //         setCabin('First Class');
    //         setCb('First');
    //     }
    //     else if (bookingInfo.CabinClass === 'B'){
    //         setCabin('Business');
    //         setCb('Bus');
    //     }
    // }    

    function getClass2(CabinClass){
        if(CabinClass ==='E'){
            return 'Economy';
        }
        else if(CabinClass === 'F'){
            return 'First';
        }
        else if (CabinClass === 'B'){
            return 'Business';
        }
        return 'Error in getClass()';
    }

    function getClass(CabinClass) {
      if (CabinClass === "E") {
        return "Econ";
      } else if (CabinClass === "F") {
        return "First";
      } else if (CabinClass === "B") {
        return "Bus";
      }
      return "Error in getClass()";
    }
    
    return(
        <div>
            
            <Container>
                <br/>
                <h3><em>Trip Summary</em></h3>
                <br/>
                {Object.keys(bookingInfo.DepartureFlight).length !== 0 && 
                    <div>
                    <h4>{bookingInfo.DepartureFlight.FromAirport} <i className="fas fa-plane-departure"> {bookingInfo.DepartureFlight.ToAirport}</i></h4>
                    <h5>{bookingInfo.DepartureFlight.DepDate.split('T')[0]} | {bookingInfo.DepartureFlight.Departure.Hours}:{bookingInfo.DepartureFlight.Departure.Minutes} {bookingInfo.DepartureFlight.Departure.Period} </h5>
                    <br/>
                    <h5> Class : {getClass2(bookingInfo.DepCabinClass)} </h5>
                    <h5>Price/Adult = {bookingInfo.DepartureFlight.Price[getClass(bookingInfo.DepCabinClass)]} <i className="fas fa-dollar-sign"></i></h5>
                     <h5>Price/Child = {bookingInfo.DepartureFlight.Price[getClass(bookingInfo.DepCabinClass)]/2} <i className="fas fa-dollar-sign"></i></h5> 
                </div>

                }
                <hr/>
                
                {Object.keys(bookingInfo.ReturnFlight).length !== 0 && 
                <div>
                    <h4>{bookingInfo.ReturnFlight.FromAirport} <i className="fas fa-plane-arrival"></i> {bookingInfo.ReturnFlight.ToAirport} </h4>
                    <h5>{bookingInfo.ReturnFlight.DepDate.split('T')[0]} | {bookingInfo.ReturnFlight.Departure.Hours}:{bookingInfo.ReturnFlight.Departure.Minutes} {bookingInfo.ReturnFlight.Departure.Period} </h5>
                    <br/>
                    <h5> Class : {getClass2(bookingInfo.RetCabinClass)} </h5>
                    <h5>Price/Adult = {bookingInfo.ReturnFlight.Price[getClass(bookingInfo.RetCabinClass)]} <i className="fas fa-dollar-sign"></i></h5>
                     <h5>Price/Child = {bookingInfo.ReturnFlight.Price[getClass(bookingInfo.RetCabinClass)]/2} <i className="fas fa-dollar-sign"></i></h5> 
                </div>

                }
                <hr/>

                <h5>{bookingInfo.NumberOfPassengers} x Passenger(s)</h5>
                <h5>{bookingInfo.AdultPassengers} Adult(s)</h5>
                <h5>{bookingInfo.KidPassengers} Kid(s)</h5>
                
                <hr/>
                <h4>Total Cost: {bookingInfo.TotalCost} <i className="fas fa-dollar-sign"></i></h4>
                 
                <hr/>
               
                {bookingInfo.DepSeats.length == bookingInfo.NumberOfPassengers && bookingInfo.RetSeats.length == bookingInfo.NumberOfPassengers
                   && <button onClick={showConfirm} className='btn btn-m btn-primary'>Proceed To Checkout</button>}
            </Container>

        </div>
    );

}    