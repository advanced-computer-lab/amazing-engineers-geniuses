import React,{ useEffect } from 'react';
import { Form,FloatingLabel,Row,Col,InputGroup, Container,Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from 'axios';


const api = 'http://localhost:8000';

export default function SearchFlight(props){
    const history = useHistory();
    const[FromAirport,setFromAirport]=React.useState("");
    const[ToAirport,setToAirport]=React.useState("");
    const[DepCabinClass,setDepCabinClass]=React.useState('E');
    const[RetCabinClass,setRetCabinClass]=React.useState('E');
    const[DepDate,setDepDate]=React.useState('');
    const[RetDate,setRetDate]=React.useState('');
    const[AdultPassengers,setAdultPassengers]= React.useState(1);
    const[KidPassengers,setKidPassengers]= React.useState(0);
    const[PassengersNumber,setPassengersNumber]=React.useState(KidPassengers + AdultPassengers);
    //const flights=[];

    useEffect(() => {
      setPass();
    }, [KidPassengers, AdultPassengers]);

    const flightsAvailable = (e) =>{
        e.preventDefault();

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

            console.log(flights);
            flightsWithReturn = flightsWithReturn.filter(tuple=> tuple.DepFlight.SeatsList.Available.filter(seat => seat.charAt(0) === DepCabinClass ).length >= PassengersNumber)
            console.log(flightsWithReturn);
            history.push({
                // pathname: '/availableFlights',
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
        console.log(typeof pass);
        setPassengersNumber(pass);
    }

    let today = new Date();
    // console.log(today);
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const min = today.getMinutes();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;


   return (
     <Form onSubmit={flightsAvailable}>
       <Container
         style={
           {
             //    backgroundColor:'#00BFFF',
             //    width:'800px',
             //    height:'200px',
           }
         }
       >
         <Form.Group className="mb-3" controlId="Airports">
           <Row>
             <Col>
               <InputGroup className="mb-3">
                 <InputGroup.Text>From</InputGroup.Text>

                 <Form.Control
                   type="text"
                   value={FromAirport}
                   placeholder="Enter Departure Airport"
                   required
                   onChange={(e) => setFromAirport(e.target.value)}
                 />
               </InputGroup>
             </Col>
             <Col>
               <InputGroup className="mb-3">
                 <InputGroup.Text>To</InputGroup.Text>
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
           <Col md="auto">
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
                   <option value="F">First</option>
                 </Form.Select>
               </InputGroup>
               
             </Form.Group>
           </Col>
           <Col md="auto">
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
                   <option value="F">First</option>
                 </Form.Select>
               </InputGroup>
               
             </Form.Group>
           </Col>
           </Row>
           <Row className="align-items">
           <Col md="auto">
             <Form.Group controlId="formGridAPassengers">
               {/* <FloatingLabel column="sm" controlId="floatingInput" label="Number of Passengers"> */}
               <Form.Control
                 type="number" min="1"
                 placeholder="Adults"
                 name="Adult Passengers "
                 required
                 onChange={(e) => {setAdultPassengers(e.target.value);setPass()}}
               />
               {/* </FloatingLabel> */}
             </Form.Group>
           </Col>
           <Col md="auto">
             <Form.Group controlId="formGridKPassengers">
               {/* <FloatingLabel column="sm" controlId="floatingInput" label="Number of Passengers"> */}
               <Form.Control
                 type="number" min="0"
                 placeholder="Children"
                 name="Kid Passengers"
                 required
                 onChange={(e) => {setKidPassengers(e.target.value);setPass()}}
               />
               {/* </FloatingLabel> */}
             </Form.Group>
           </Col>
           </Row>
    
         <br/>
         
         <Row className="align-items">
           <Col md="auto">
             <Form.Group controlId="formGridDepartue">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Departure</InputGroup.Text>

                 {/* <Form.Control  type="time" name="Departure" onChange={(e)=>setDeparture(e.target.value)} /> */}

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
           <Col md="auto">
             <Form.Group controlId="formGridArrival">
               <InputGroup className="mb-3">
                 <InputGroup.Text>Return</InputGroup.Text>
                 {/* <Form.Control   type="time" name="Arrival" onChange={(e)=>setArrival(e.target.value)} /> */}
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

         <Button className="btn btn-primary" type="submit">
           Search
         </Button>
       </Container>
     </Form>
   );

    
}