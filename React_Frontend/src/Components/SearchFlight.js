import React,{ useEffect,useState } from 'react';
import { Form,Row,Col,InputGroup, Container,Button,Spinner} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import '../Styles/Slideshow.css';
import '../Styles/SearchFlight.css';
import axios from 'axios';


const api = 'http://localhost:8000';

export default function SearchFlight(props){
    let history = useHistory();
    const[FromAirport,setFromAirport]=React.useState("");
    const[ToAirport,setToAirport]=React.useState("");
    const[DepCabinClass,setDepCabinClass]=React.useState('E');
    const[RetCabinClass,setRetCabinClass]=React.useState('E');
    const[DepDate,setDepDate]=React.useState('');
    const[RetDate,setRetDate]=React.useState('');
    const[AdultPassengers,setAdultPassengers]= React.useState(1);
    const[KidPassengers,setKidPassengers]= React.useState(0);
    const[PassengersNumber,setPassengersNumber]=React.useState(KidPassengers + AdultPassengers);
    const[showSpinner, setSpinner] = useState(false);

    useEffect(() => {
    }, []);

    useEffect(() => {
      setPass();
    }, [KidPassengers, AdultPassengers]);

    const flightsAvailable = () =>{
        axios.post(`${api}/searchFlights`,{
           FromAirport:FromAirport.toUpperCase(),
           ToAirport:ToAirport.toUpperCase(),
           DepDate:DepDate,
           RetDate: RetDate
        }).then((res) =>{
            let flightsWithReturn=res.data;
            let flights = flightsWithReturn.map((tuple,i)=>(
               tuple.DepFlight 
            ))
            flightsWithReturn = flightsWithReturn.filter(tuple=> tuple.DepFlight.SeatsList.Available.filter(seat => seat.charAt(0) === DepCabinClass ).length >= PassengersNumber)
            flightsWithReturn = filterReturnFlights(flightsWithReturn);  
            history.push({
                pathname: 'createBooking',
                state: { flightsWithReturn: flightsWithReturn, RetDate: RetDate, DepCabinClass: DepCabinClass, RetCabinClass: RetCabinClass, PassengersNumber: PassengersNumber ,AdultPassengers:AdultPassengers , KidPassengers:KidPassengers}
            });    
        }).catch((error) =>{
            if(error){
                console.log(error);
            }
        })
    }

    const setPass = ()=>{
        let pass = (Number.parseInt(AdultPassengers) + Number.parseInt(KidPassengers))*1;
        setPassengersNumber(pass);
    }

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

    const filterReturnFlights = (flightsWithReturn)=>{
      let result = []
      flightsWithReturn.forEach(tuple => {
        let dep = tuple.DepFlight;
        let retList = tuple.ReturnFlights;
        let filteredRetList = retList.filter(ret => ret.SeatsList.Available.filter(seat => seat.charAt(0) === RetCabinClass).length >= PassengersNumber);
        if(filteredRetList.length !== 0){
          let newTuple = {
            DepFlight: dep,
            ReturnFlights: retList
          }
          result = [...result, newTuple];
        }
      });
      return result;
    }


   return (
     <Form id='searchForm' onSubmit={(e)=>{
       e.preventDefault();
       setSpinner(true);
       setTimeout(flightsAvailable, 2000);
       }}>
      <h3 style={{textAlign:'left', paddingLeft:'20px', fontWeight:'300', paddingBottom:'10px'}}>Book a Trip</h3>
       <Container id='searchContainer'>
          {showSpinner && 
            <div className="pos-center text-primary" style={{width: '100px', height: '100px', zIndex:'20'}} >   
              <Spinner animation="border" />
              <span >Loading...</span>
            </div>}

         <Form.Group className="mb-3" controlId="Airports">
           <Row className="align-items">
             <Col xs={5} >
               <InputGroup className="mb-3" >
                 <InputGroup.Text style={{ paddingRight: '55px',paddingLeft: '55px' }}  >From</InputGroup.Text>

                 <Form.Control
                 
                   type="text"
                   value={FromAirport}
                   placeholder="Enter Departure Airport"
                   required
                   onChange={(e) => setFromAirport(e.target.value)}
                 />
               </InputGroup>
             </Col>
             <Col xs={5}>
               <InputGroup className="mb-3">
                 <InputGroup.Text style={{paddingRight: '52px' ,paddingLeft: '52px' }} >To</InputGroup.Text>
                 <Form.Control
                   type="text"
                   value={ToAirport}
                   placeholder="Enter Arrival Airport"
                   required
                   onChange={(e) => setToAirport(e.target.value)}
                 />
               </InputGroup>
             </Col>
           </Row>
         </Form.Group>

           <Row className="align-items">
           <Col xs={5}>
             <Form.Group controlId="formGridDepartue">
               <InputGroup className="mb-3">
                 <InputGroup.Text style={{ paddingRight: '35px',paddingLeft: '35px' }}>Departure</InputGroup.Text>

                 <Form.Control
                   type="date"
                   name="DepDate"
                   min={today}
                   required
                   onChange={(e) => setDepDate(e.target.value)}
                 />
               </InputGroup>
             </Form.Group>
           </Col>
           <Col xs={5} >
             <Form.Group controlId="formGridArrival">
               <InputGroup className="mb-3">
                 <InputGroup.Text style={{ paddingRight: '36px' ,paddingLeft: '36px' }}>Return</InputGroup.Text>
                 <Form.Control
                   type="date"
                   name="RetDate"
                   min={DepDate || today}
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
                   placeholder=" Departure Cabin Class"
                   value={DepCabinClass}
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
                   placeholder=" Return Cabin Class"
                   value={RetCabinClass}
                   required
                   onChange={(e) => setRetCabinClass(e.target.value)}
                 >
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
               <InputGroup.Text style={{ paddingRight: '52px' ,paddingLeft: '52px'}}>Adults</InputGroup.Text>
               
               <Form.Control
                 type="number" min="1"
                 placeholder="Number Of Adults"
                 name="Adult Passengers "
                 required
                 onChange={(e) => {setAdultPassengers(e.target.value);setPass()}}
               />
               </InputGroup>
             </Form.Group>
            
           </Col>
           <Col xs={5}>
             <Form.Group controlId="formGridKPassengers">
               <InputGroup className="mb-3">
               <InputGroup.Text style={{ paddingRight: '28px',paddingLeft: '28px' }}>Children</InputGroup.Text>
               <Form.Control
                 type="number" min="0"
                 placeholder="Number Of Children"
                 name="Kid Passengers"
                 required
                 onChange={(e) => {setKidPassengers(e.target.value);setPass()}}
               />
               </InputGroup>
             </Form.Group>
           </Col>
         
           </Row>
           <Button className="btn btn-home"  type="submit">
                Search
                </Button>
    
        

       </Container>
     </Form>
   );

    
}