import React,{ Component, useEffect,useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

export default function FlightSummary(props){

    const [bookingInfo, setBookingInfo] = useState(props.bookingInfo);
    const [cabin,setCabin] = useState('');
    const [cb,setCb] = useState('Econ');
    const [depFlightPrice,setDepFlightPrice]= useState(0);
    const [retFlightPrice,setRetFlightPrice]= useState(0);

    useEffect(() => {
        getClass();
        // window.location.reload(false);
    }, []);

    useEffect(() => {
        setBookingInfo(props.bookingInfo)
    }, [props.bookingInfo]);

    const showConfirm = () => {
        props.showConfirm();
    }

    function getClass() {
        if(bookingInfo.CabinClass ==='E'){
            setCabin('Economy');
            setCb('Econ');

        }
        else if(bookingInfo.CabinClass === 'F'){
            setCabin('First Class');
            setCb('First');
        }
        else if (bookingInfo.CabinClass === 'B'){
            setCabin('Business');
            setCb('Bus');
        }
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
                    <h5>{bookingInfo.DepartureFlight.DepDate.split("T")[0]} </h5>
                    <br/>
                    <h5>Price/Person = {bookingInfo.DepartureFlight.Price[cb]} <i className="fas fa-dollar-sign"></i></h5>
                    
                </div>

                }
                <hr/>
                
                {Object.keys(bookingInfo.ReturnFlight).length !== 0 && 
                <div>
                    <h4>{bookingInfo.ReturnFlight.FromAirport} <i className="fas fa-plane-arrival"></i> {bookingInfo.ReturnFlight.ToAirport} </h4>
                    <h5>{bookingInfo.ReturnFlight.DepDate.split("T")[0]} </h5>
                    <br/>

                    <h5>Price/Person = {bookingInfo.ReturnFlight.Price[cb]} <i className="fas fa-dollar-sign"></i></h5>
                </div>

                }
                <hr/>

                <h5>{bookingInfo.NumberOfPassengers} x Passenger(s)</h5>

                <h5> Class: {cabin}</h5>
                
                <hr/>
                <h4>Total Cost: {bookingInfo.TotalCost} <i className="fas fa-dollar-sign"></i></h4>
                 
                <hr/>
               
                {bookingInfo.DepSeats.length == bookingInfo.NumberOfPassengers && bookingInfo.RetSeats.length == bookingInfo.NumberOfPassengers
                   && <button onClick={showConfirm} className='btn btn-m btn-primary'>Proceed To Checkout</button>}
            </Container>

        </div>
    );

}    