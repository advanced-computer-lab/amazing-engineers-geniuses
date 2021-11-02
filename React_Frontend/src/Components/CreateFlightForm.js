import React, {Component} from 'react';
import axios from 'axios';
const api = 'http://localhost:8000';

class CreateFlightForm extends Component{
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
            ToAirport: ''
         }
         this.changeText = this.changeText.bind(this);
         this.submitForm = this.submitForm.bind(this);
    }

    changeText(event){
         let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    submitForm(e){
        e.preventDefault();
        const newFlight = this.state;
        axios.post(`${api}/admin/flight/create`,newFlight)
            .then((res)=>{
                console.log('Flight Created:\n' + newFlight);
                this.props.history.push('/admin/flight/show');
            })
            .catch((err)=>{
                console.log(err)
            });
        this.setState({
                    FlightNumber: '',
                    Departure: '',
                    Arrival: '',
                    FlightDate: '',
                    EconomySeat: '',
                    BusinessSeats: '',
                    FirstClassSeats: '',
                    FromAirport: '',
                    ToAirport: ''
                })
    }

    render(){

        return (
            <div>
                <h1>Create Flight</h1>
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
                <button onClick={this.submitForm} >Create</button>
            </div>
        )
    }
}

export default CreateFlightForm;