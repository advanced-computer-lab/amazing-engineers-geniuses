import React,{ useEffect,useState } from 'react';
import { Form,Row,Col,InputGroup, Container,Button,Spinner} from "react-bootstrap";
import {useLocation } from "react-router-dom";

import {useHistory} from "react-router-dom";
import '../Styles/Slideshow.css';
import '../Styles/SearchFlight.css';
import axios from 'axios';

const api = 'http://localhost:8000';

export default function EditFlight(props){
    let history = useHistory();
    const location = useLocation();

    const [booking,setBooking]= useState(location.state.booking);

    const [departureFlight, setDepartureFlight] = useState(location.state.departureFlight);
    const [returnFlight, setReturnFlight] = useState(location.state.returnFlight);
    
    const [date, setDate] = useState(location.state.date);
    const [returnDate, setRetDate] = useState(location.state.returnDate);
    
    const [arrDep, setArrDep] = useState(location.state.arrDep);
    const [arrRet, setArrRet] = useState(location.state.arrRet);
    
    const[depFlightDepTime,setDepFDepT]= useState(location.state.depFlightDepTime);
    const[depFlightArrTime,setDepFArrT]= useState(location.state.depFlightArrTime);
    
    const[retFlightDepTime,setRetFDepT]= useState(location.state.retFlightDepTime);
    const[retFlightArrTime,setRetFArrT]= useState(location.state.retFlightArrTime);

    const[DepCabinClass,setDepCabinClass]=useState(location.state.booking.DepCabinClass);
    const[RetCabinClass,setRetCabinClass]=useState(location.state.booking.RetCabinClass);

    // useEffect(() => {
    //   setPass();
    // }, [KidPassengers, AdultPassengers]);

    // const flightsAvailable = () =>{
    //     axios.post(`${api}/searchFlights`,{
    //        FromAirport:FromAirport.toUpperCase(),
    //        ToAirport:ToAirport.toUpperCase(),
    //        DepDate:DepDate,
    //        RetDate: RetDate
    //     }).then((res) =>{
    //         let flightsWithReturn=res.data;
    //         let flights = flightsWithReturn.map((tuple,i)=>(
    //            tuple.DepFlight 
    //         ))
    //         flightsWithReturn = flightsWithReturn.filter(tuple=> tuple.DepFlight.SeatsList.Available.filter(seat => seat.charAt(0) === DepCabinClass ).length >= PassengersNumber)
    //         flightsWithReturn = filterReturnFlights(flightsWithReturn);  
    //         history.push({
    //             pathname: 'createBooking',
    //             state: { flightsWithReturn: flightsWithReturn, RetDate: RetDate, DepCabinClass: DepCabinClass, RetCabinClass: RetCabinClass, PassengersNumber: PassengersNumber ,AdultPassengers:AdultPassengers , KidPassengers:KidPassengers}
    //         });    
    //     }).catch((error) =>{
    //         if(error){
    //             console.log(error);
    //         }
    //     })
    // }

    // const setPass = ()=>{
    //     let pass = (Number.parseInt(AdultPassengers) + Number.parseInt(KidPassengers))*1;
    //     setPassengersNumber(pass);
    // }

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();


    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    // const filterReturnFlights = (flightsWithReturn)=>{
    //   let result = []
    //   flightsWithReturn.forEach(tuple => {
    //     let dep = tuple.DepFlight;
    //     let retList = tuple.ReturnFlights;
    //     let filteredRetList = retList.filter(ret => ret.SeatsList.Available.filter(seat => seat.charAt(0) === RetCabinClass).length >= PassengersNumber);
    //     if(filteredRetList.length !== 0){
    //       let newTuple = {
    //         DepFlight: dep,
    //         ReturnFlights: retList
    //       }
    //       result = [...result, newTuple];
    //     }
    //   });
    //   return result;
    // }


   return (
    
     <Form id='searchForm' onSubmit={(e)=>{
       e.preventDefault();
       //setSpinner(true);
       //setTimeout(flightsAvailable, 2000);
       }}>
      {/* <h3 style={{textAlign:'left', paddingLeft:'20px', fontWeight:'300', paddingBottom:'10px'}}>Book a Trip</h3> */}
      <br/>
       <Container id='searchContainer'>
           
            <div className="pos-center text-primary" style={{width: '100px', height: '100px', zIndex:'20'}} >   
              {/* <Spinner animation="border" /> */}
              {/* <span >Loading...</span> */}
            </div>

         <Form.Group className="mb-3" controlId="Airports">
           <Row>
             <Col xs={5}>
               <InputGroup className="mb-3">
                 <InputGroup.Text>From</InputGroup.Text>

                 <Form.Control
                   type="text"
                   value={returnDate}
                   placeholder={returnDate}
                   value={returnFlight.FromAirport}
                   required
                   editable = {false}
                   //onChange={(e) => setFromAirport(e.target.value)}
                 />
                 
               </InputGroup>
             </Col>
             <Col xs={5}>
               <InputGroup className="mb-3">
                 <InputGroup.Text>To</InputGroup.Text>
                 <Form.Control
                   type="text"
                   value={returnFlight.ToAirport}
                   required
                   editable = {false}
                 />
               </InputGroup>
             </Col>
           </Row>
         </Form.Group>

           <Row className="align-items">
           <Col xs={5}>
             <Form.Group controlId="formGridDepartue">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Departure</InputGroup.Text>

                 <Form.Control
                   type="date"
                   placeholder={date}
                   name="DepDate"
                   min={today}
                   required
                   //onChange={(e) => setDepDate(e.target.value)}
                 />
               </InputGroup>
             </Form.Group>
           </Col>
           <Col xs={5} >
             <Form.Group controlId="formGridArrival">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Return</InputGroup.Text>
                 <Form.Control
                   type="date"
                   placeholder={returnDate}
                   name="RetDate"
                   min={date || today}
                   required
                   onChange={(e) => setRetDate(e.target.value)}
                 />
               </InputGroup>
             </Form.Group>
           </Col>
         </Row>

         <Row className="align-items">
           <Col xs={5}>
             <Form.Group controlId="formGridCabin">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Departure Class</InputGroup.Text>
                 <Form.Select
                   name="DepCabinClass"
                   placeholder={booking.DepCabinClass}
                   required
                   onChange={(e) => setDepCabinClass(e.target.value)}
                 >
                   <option value="E">Economy</option>
                   <option value="B">Business</option>
                   <option value="F">First Class</option>
                 </Form.Select>
               </InputGroup>
               
             </Form.Group>
           </Col>
           <Col xs={5}>
             <Form.Group controlId="formGridCabin">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Return Class</InputGroup.Text>
                 <Form.Select
                   name="RetCabinClass"
                   placeholder={booking.RetCabinClass}
                   required
                   onChange={(e) => setRetCabinClass(e.target.value)}>
                   <option value="E">Economy</option>
                   <option value="B">Business</option>
                   <option value="F">First Class</option>
                 </Form.Select>
               </InputGroup>
               
             </Form.Group>
           </Col>
           </Row>  
           
           <Row className="align-items">
           <Col xs={5}>
             <Form.Group controlId="formGridAPassengers">
             <InputGroup className="mb-3">
               <InputGroup.Text>Adults</InputGroup.Text>
               
               <Form.Control
                 type="number" min="1"
                 //placeholder="Enter Number Of Adults"
                 name="Adult Passengers "
                 required
                 value={booking.AdultPassengers}
                 //onChange={(e) => {setAdultPassengers(e.target.value);setPass()}}
               />
               </InputGroup>
             </Form.Group>
            
           </Col>
           <Col xs={5}>
             <Form.Group controlId="formGridKPassengers">
               <InputGroup className="mb-3">
               <InputGroup.Text>Children</InputGroup.Text>
               <Form.Control
                 type="number" min="0"
                 placeholder="Number Of Children"
                 value={booking.KidPassengers}
                 name="Kid Passengers"
                 required
                 //onChange={(e) => {setKidPassengers(e.target.value);setPass()}}
               />
               </InputGroup>
             </Form.Group>
                          
           </Col>
           
           <Button className="btn btn-home"  type="submit"> Search</Button>
         
           </Row>
           
    
         <br/>

       </Container>
     </Form>
   );

    
}