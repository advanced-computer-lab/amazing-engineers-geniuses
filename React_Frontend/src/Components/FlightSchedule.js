import React, {Component} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
const api = 'http://localhost:8000';
//var flights=[];

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

        // this.test = this.test.bind(this);
    }

//    const baseURL= `${api}/admin/flight/showFlights`;

    componentDidMount(){
        axios.get(`${api}/flightSchedule`)
        .then((res)=>{
            this.setState({
                flights: res.data
            });

           // flights= res.data;
            console.log("BBBBBBBBBBBB");
            console.log(this.state.flights);
            console.log("----------------");
            console.log(this.setState()); 
            
         })
         .catch((err)=>{
             console.log(err)
         })

    }

    componentDidUpdate(){
        axios.get(`${api}/flightSchedule`)
        .then((res)=>{
            this.setState({
                flights: res.data
            });

           // flights= res.data;
            console.log("BBBBBBBBBBBB");
            console.log(this.state.flights);
            console.log("----------------");
            console.log(this.setState()); 
            
         })
         .catch((err)=>{
             console.log(err)
         })
    }

    // const showFlights=()=>({
    //     fetch()
    // });

    render(){

        const flightList = this.state.flights.map((flight, key)=>
            <FlightItem hideBtn={true} flight={flight} key={key}/>
    )

    //const flightList= this.state.flights.FlightNumber;

    //const flightList = this.state.flights.map((flight,key) => <FlightItem flight={flight} key={key} /> )

    console.log(flightList);
    console.log("AAAAAAAAAAAAA");

       return (
          <div>
            <h1> <em>FLIGHT SCHEDULE</em></h1>

            <div>
              <ol>
               {flightList}
              </ol>
            </div>

          </div> 

       )
  }
 
}

export default FlightSchedule;