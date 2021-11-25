import React, {Component} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

const api = 'http://localhost:8000';

class ShowFlights extends Component{
    constructor(props){
        super(props);
        this.state = {
            FlightNumber: '',
            Departure: '',
            Arrival: '',
            DepDate:'',
            ArrDate:'',
            EconomySeats: '',
            BusinessSeats: '',
            FirstClassSeats: '',
            FromAirport: '',
            ToAirport: '',
            Terminal:'',
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
            })
            .catch((err)=>console.log(err.response));
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
            }).catch((err)=>{
                console.log(err.response);
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
               const data= res.data;
               this.setState({
                   flights: data
               });
               
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
    }


    render(){

        const flightList = this.state.flights.map((flight, key)=>
            <FlightItem hideBtn = {false} flight={flight} key={key} deleteFlight={this.deleteFlight}  />
        )
        return (
            <div> 
                <form onSubmit={this.submitForm}>
                    <h1>Show Flights</h1>
                    <label>Flight Number</label>
                    <input type='number' placeholder='FlightNumber' name="FlightNumber"  onChange={this.changeText}/>
                    <br/>
                     <label>Departure</label>
                    <input type='time' name="Departure" onChange={this.changeText}/>
                    <input type='date' name="DepDate" onChange={this.changeText}/>
                    <br/>
                    <label>Arrival</label>
                    <input type='time' name="Arrival" onChange={this.changeText}/>
                    <input type='date'  name="ArrDate" onChange={this.changeText}/>
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
                    <label>Terminal</label>
                    <input type='number' placeholder='Terminal' name="Terminal" onChange={this.changeText}/>
                    <br/>
                    <button type='submit' className='btn btn-warning' >Filter</button>
                    
                </form>
                <button className='btn btn-info'><Link style={{color: 'white'}} to="/admin/flight/create" >Create New Fight</Link></button>
                
            
                <div>
                   <Accordion>
                        {flightList}
                    </Accordion>
                </div>


            </div>
        )
    }
}

export default ShowFlights;