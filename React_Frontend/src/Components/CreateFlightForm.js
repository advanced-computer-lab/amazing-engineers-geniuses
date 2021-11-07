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
                this.props.history.push('/admin/flight/show');
            })
            .catch((err)=>{
                console.log(err)
            });
        
    }

    render(){

        return (
            <div>
                <form onSubmit = {this.submitForm}>
                    <h1>Create Flight</h1>
                    <label>Flight Number</label>
                    <input type='number' placeholder='FlightNumber' name="FlightNumber"  required  onChange={this.changeText}/>
                    <br/>
                    <label>Departure Time</label>
                    <input type='time' name="Departure" required onChange={this.changeText}/>
                    <br/>
                    <label>Arrival Time</label>
                    <input type='time' name="Arrival" required onChange={this.changeText}/>
                    <br/>
                    <label>Flight Date</label>
                    <input type='date'  name="FlightDate" required onChange={this.changeText}/>
                    <br/>
                    <label>Economy Seats</label>
                    <input type='number' placeholder='EconomySeats' name="EconomySeats" required onChange={this.changeText}/>
                    <br/>
                    <label>Business Seats </label>
                    <input type='number' placeholder='BusinessSeats' name="BusinessSeats" required onChange={this.changeText}/>
                    <br/>
                    <label>First Class seats</label>
                    <input type='number' placeholder='FirstClassSeats' name="FirstClassSeats" required onChange={this.changeText}/>
                    <br/>
                    <label>From Airport </label>
                    <input type='text' placeholder='FromAirport' name="FromAirport" required onChange={this.changeText}/>
                    <br/>
                    <label>To Airport </label>
                    <input type='text' placeholder='ToAirport' name="ToAirport" required onChange={this.changeText}/>
                    <br/>
                    <label>Terminal</label>
                    <input type='text' placeholder='Terminal' name="Terminal" required onChange={this.changeText}/>
                    <br/>
                    <button type='submit'>Create</button>
                </form>
            </div>
        )
    }
}

export default CreateFlightForm;