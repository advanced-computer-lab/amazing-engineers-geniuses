import React,{ Component, useEffect,useState } from 'react';
import {Container, Row, Col,Card} from 'react-bootstrap'

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
                
                <Card >
                  <Card.Body>
                    <Card.Title ><em>Trip Summary</em></Card.Title>
                    <hr/>
                {/* <h3><em>Trip Summary</em></h3> */}
                {Object.keys(bookingInfo.DepartureFlight).length !== 0 && 
                    <div>
                     <Card.Title >{"Departure "}<i className="fas fa-plane-departure">  </i><br/><br/>{bookingInfo.DepartureFlight.FromAirport}  <i class="fas fa-arrow-right"></i>{bookingInfo.DepartureFlight.ToAirport} </Card.Title>
                     <Card.Subtitle className="mb-2 text-muted">{bookingInfo.DepartureFlight.DepDate.split('T')[0]} <br/> {bookingInfo.DepartureFlight.Departure.Hours}:{bookingInfo.DepartureFlight.Departure.Minutes} {bookingInfo.DepartureFlight.Departure.Period} </Card.Subtitle>
                    <br/>
                    <Card.Subtitle className="mb-2 text-muted"> <li>Class : {getClass2(bookingInfo.DepCabinClass)}</li> </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted"> <li>Price/Adult = {bookingInfo.DepartureFlight.Price[getClass(bookingInfo.DepCabinClass)]} <i className="fas fa-dollar-sign"></i></li></Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted"> <li>Price/Child = {bookingInfo.DepartureFlight.Price[getClass(bookingInfo.DepCabinClass)]/2} <i className="fas fa-dollar-sign"></i></li></Card.Subtitle>
                </div>

                }
                <hr/>
                
                {Object.keys(bookingInfo.ReturnFlight).length !== 0 && 
                <div>
                   <Card.Title >{"Arrival "}<i className="fas fa-plane-arrival"></i><br/><br/>{bookingInfo.ReturnFlight.FromAirport} <i class="fas fa-arrow-right"></i>{bookingInfo.ReturnFlight.ToAirport}  </Card.Title>
                   <Card.Subtitle className="mb-2 text-muted">{bookingInfo.ReturnFlight.DepDate.split('T')[0]} <br/>{bookingInfo.ReturnFlight.Departure.Hours}:{bookingInfo.ReturnFlight.Departure.Minutes} {bookingInfo.ReturnFlight.Departure.Period} </Card.Subtitle>
                    <br/>
                    <Card.Subtitle className="mb-2 text-muted"> <li> Class : {getClass2(bookingInfo.RetCabinClass)} </li> </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted"> <li>Price/Adult = {bookingInfo.ReturnFlight.Price[getClass(bookingInfo.RetCabinClass)]} <i className="fas fa-dollar-sign"></i></li></Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted"> <li>Price/Child = {bookingInfo.ReturnFlight.Price[getClass(bookingInfo.RetCabinClass)]/2} <i className="fas fa-dollar-sign"></i></li></Card.Subtitle>
                </div>

                }
                <hr/>

                <Card.Subtitle className="mb-2 text-muted">{bookingInfo.NumberOfPassengers} x Passenger(s)</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"> <li>{bookingInfo.AdultPassengers} Adult(s)</li></Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"> <li>{bookingInfo.KidPassengers} Kid(s)</li></Card.Subtitle>
                
                <hr/>
                <Card.Title >Total Cost:  </Card.Title >
                <Card.Subtitle className="mb-2 text-muted"> {bookingInfo.TotalCost} <i className="fas fa-dollar-sign"></i></Card.Subtitle>
                <hr/>
               
                {bookingInfo.DepSeats.length == bookingInfo.NumberOfPassengers && bookingInfo.RetSeats.length == bookingInfo.NumberOfPassengers
                   && <button onClick={showConfirm} className='btn btn-m btn-primary'>Proceed To Checkout</button>}
            </Card.Body>
            </Card>
            </Container>

        </div>
    );

}    