import React, {Component} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const api = 'http://localhost:8000';

class ShowFlights extends Component{
    constructor(props){
        super(props);
        this.state = {
            FlightNumber: '',
            Departure: '',
            Arrival: '',
            FlightDate: '',
            EconomySeats: '',
            BusinessSeats: '',
            FirstClassSeats: '',
            FromAirport: '',
            ToAirport: '',
            flights:[]
         }
         this.changeText = this.changeText.bind(this);
         this.submitForm = this.submitForm.bind(this);
         this.deleteFlight = this.deleteFlight.bind(this);
    }

    componentDidMount(){
        axios.get(`${api}/admin/flight/show`)
            .then((res)=>{
                this.setState({
                    flights: res.data
                });
                console.log(res.data);
            })
            .catch((err)=>console.log(err));
    }
   // axios.delete(`${api}/admin/flight/delete/${id}`).then(res=>{this.setSatete(previousState=>{return{flights: this.state.flights.filter((flight)=>(flight._id !== id}})})

     deleteFlight(id){
        console.log(id);
        axios.delete(`${api}/admin/flight/delete/${id}`)
            .then(()=>{
               console.log(`Deleted ${id}`);
               this.setState({
                   flights: this.state.flights.filter((flight)=>(flight._id !== id))
               })
            });
    }
    

    changeText(event){
         let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    submitForm(e){
        e.preventDefault(); 
        const filerCriteria = this.state;
        axios.post(`${api}/admin/flight/show`,filerCriteria)
            .then((res)=>{
               console.log('resdata'); 
               console.log(res.data); 
               const data= res.data;
               this.setState({
                   flights: data
               });
               console.log("stateflight");
               console.log(this.state.flights);
               //this.props.history.push('/admin/flight/show');
               
            })
            .catch((err)=>{
                console.log(err)
            })
    }


    render(){

        const flightList = this.state.flights.map((flight, key)=>
            <FlightItem hideBtn = {false} flight={flight} key={key} deleteFlight={this.deleteFlight}  />
        )
        console.log('Flightlist');
        console.log(flightList);

        return (
            <div>
                  
                <form onSubmit={this.submitForm}>
                    <h1>Show Flights</h1>
                    <label>Flight Number</label>
                    <input type='number' placeholder='FlightNumber' name="FlightNumber"  onChange={this.changeText}/>
                    <br/>
                    <label>Departure Time</label>
                    <input type='time' name="Departure" onChange={this.changeText}/>
                    <br/>
                    <label>Arrival Time</label>
                    <input type='time' name="Arrival" onChange={this.changeText}/>
                    <br/>
                    <label>Flight Date</label>
                    <input type='date'  name="FlightDate" onChange={this.changeText}/>
                    <br/>
                    <label>Economy Seats</label>
                    <input type='number' placeholder='EconomySeats' name="EconomySeats" onChange={this.changeText}/>
                    <br/>
                    <label>Business Seats </label>
                    <input type='number' placeholder='BusinessSeats' name="BusinessSeats" onChange={this.changeText}/>
                    <br/>
                    <label>First Class seats</label>
                    <input type='number' placeholder='FirstClassSeats' name="FirstClassSeats" onChange={this.changeText}/>
                    <br/>
                    <label>From Airport </label>
                    <input type='text' placeholder='FromAirport' name="FromAirport" onChange={this.changeText}/>
                    <br/>
                    <label>To Airport </label>
                    <input type='text' placeholder='ToAirport' name="ToAirport" onChange={this.changeText}/>
                    <br/>
                    <button type='submit' className='btn btn-warning' >Filter</button>
                    
                </form>
                <button className='btn btn-info' onClick={()=>{this.props.history.push('/admin/flight/show')}}>View Flights Schedule</button>
                <Link to="/admin/flight/showFlights/" >Flight Schedule </Link>
            
                <div>
                    <ul>
                        {flightList}
                    </ul>
                </div>


            </div>
        )
    }
}

export default ShowFlights;