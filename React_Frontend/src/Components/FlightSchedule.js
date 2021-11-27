import React, {Component} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import { Accordion } from 'react-bootstrap';
const api = 'http://localhost:8000';

class FlightSchedule extends Component{

    constructor(props){
        super(props);
        this.state = {
            FlightNumber: '',
            Departure: '',
            Arrival: '',
            FlightDate: '',
            EconomySeat: '',
            BusinessSeats: '',
            FirstClassSeats: '',
            FromAirport: '',
            ToAirport: '',
            flights:[]
         }
    }

    componentDidMount(){
        axios.get(`${api}/flightSchedule`)
        .then((res)=>{
            this.setState({
                flights: res.data
            });
            
         })
         .catch((err)=>{
             console.log(err)
         })

    }

    render(){

        const flightList = this.state.flights.map((flight, key)=>
            <FlightItem hideBtn={true} flight={flight} key={key}/>
    )
       return (
          <div>
            <h1> <em>FLIGHT SCHEDULE</em></h1>

            <div>
              <Accordion>
               {flightList}
              </Accordion>
            </div>

          </div> 

       )
  }
 
}

export default FlightSchedule;