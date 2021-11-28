import React,{ Component } from 'react';
import axios from 'axios';
import { Form,FloatingLabel,Row,Col,InputGroup} from "react-bootstrap";
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
const api = 'http://localhost:8000';
// let today = new date();
// let date1 = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
// let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// const dateTime = time+' '+date1;

class FlightSearchUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            CabinClass:'E',
            Departure: '',//dateTime,
            Arrival: '',
            DepDate:'',
            ArrDate:'',
            FromAirport: 'CAI',
            ToAirport: '',
            PassengersNumber:''
         }
         this.changeText = this.changeText.bind(this);
         this.submitForm = this.submitForm.bind(this);
         this.changeCabin = this.changeCabin.bind(this);
    }
    
    changeText(event){
        let name = event.target.name;
       this.setState({
           [name]: event.target.value
       })
   }
   changeCabin(event){
       this.setState({
           CabinClass: event.target.value
       })
   }

    submitForm(e){
        e.preventDefault(); 
        const filterCriteria = this.state;
        axios.post(`${api}/filterFlights`,filterCriteria)
            .then((res)=>{
                const flights =res.data;
               // this.props.history.push('/availableFlights')
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
    }

    render(){
       
       return (
          <div>
              

            <form onSubmit={this.submitForm}>
               <h3><em>Search For Flights</em></h3>
                <Row className="align-items">
                    <Form.Group as={Col} controlId="formGridFromAirport">
                    <FloatingLabel  controlId="floatingInput" label="FromAirport" className="mb-5" >
                     <Form.Control  type="text" placeholder="FromAirport"  name="FromAirport" onChange={this.changeText} />
                     </FloatingLabel>
                     </Form.Group>
                     {/* <Col xs={3}>
                     <image src="two-way-arrows.png" roundedCircle />
                     </Col> */}
                     <Form.Group as={Col} controlId="formGridToAirport">
                        <FloatingLabel  controlId="floatingInput" label="ToAirport" className="mb-5" >
                        <Form.Control  type="text" placeholder="ToAirport"  onChange={this.changeText} />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCabin">
                    <InputGroup className="mb-2">
                     <InputGroup.Text>Class</InputGroup.Text>
                     <Form.Select size="lg" name="CabinClass"  placeholder="Cabin Class"value={this.state.CabinClass} onChange ={this.changeCabin}>
                     <option value="E">Economy</option>
                     <option value="B">Business</option>
                     <option value="F">First</option>
                     </Form.Select>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassengers">
                        <FloatingLabel column="sm" controlId="floatingInput" label="Number of Passengers">
                        <Form.Control   type="number" placeholder="PassengersNumber" name="PassengersNumber" onChange={this.changeText} />
                        </FloatingLabel>
                    </Form.Group>

                </Row>
            
                <Row className="align-items">
                    <Form.Group as={Col} controlId="formGridDepartue">
                        <Form.Label column="sm">Departure</Form.Label>
                        <Form.Control  type="time" name="Departure" onChange={this.changeText} />
                        <Form.Control  type="date" name="DepDate" onChange={this.changeText} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridArrival">
                        <Form.Label column="sm" >Arrival</Form.Label>
                        <Form.Control   type="time" name="Arrival" onChange={this.changeText} />
                        <Form.Control   type="date" name="Arrival" onChange={this.changeText} />
                    </Form.Group>

                   

                </Row>

                <button type='submit' className='btn btn-warning' >Search</button>
         
            </form>


          </div> 

       )
  }

}

export default FlightSearchUser