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
            DepDate:'',
            ArrDate:'',
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
                console.log('Flight Created:');
                console.log(newFlight);
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
                console.log(err.response.data.message);
            });
        
    }


    render(){
        let today = new Date();
       // console.log(today);
        const dd = today.getDate();
        const mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
        const yyyy = today.getFullYear();
        const hh = today.getHours();
        const min = today.getMinutes();

        if(dd<10){
        dd='0'+dd
        } 
        if(mm<10){
        mm='0'+mm
        } 
        today = yyyy+'-'+mm+'-'+dd;
        let timeToday = hh+':'+min;

        return (
            <div>
                <form onSubmit = {this.submitForm}>
                    <h1>Create Flight</h1>
                    <label>Flight Number</label>
                    <input type='number' placeholder='FlightNumber' name="FlightNumber" min='1' required  onChange={this.changeText}/>
                    <br/>
                    <label>Departure</label>
                    <input type='date'  name="DepDate" min={today} required onChange={this.changeText}/>
                    <input type='time' name="Departure" required onChange={this.changeText}/>
                    <br/>
                    <label>Arrival</label>
                    <input type='date'  name="ArrDate" min={this.state.DepDate} required onChange={this.changeText}/>
                    <input type='time' name="Arrival" required onChange={this.changeText}/>
                    <br/>
                    <label>Economy Seats</label>
                    <input type='number' placeholder='EconomySeats' name="EconomySeats" min='0' required onChange={this.changeText}/>
                    <br/>
                    <label>Business Seats </label>
                    <input type='number' placeholder='BusinessSeats' name="BusinessSeats" min='0' required onChange={this.changeText}/>
                    <br/>
                    <label>First Class Seats</label>
                    <input type='number' placeholder='FirstClassSeats' name="FirstClassSeats" min='0' required onChange={this.changeText}/>
                    <br/>
                    <label>From Airport </label>
                    <input type='text' placeholder='FromAirport' name="FromAirport" required onChange={this.changeText}/>
                    <br/>
                    <label>To Airport </label>
                    <input type='text' placeholder='ToAirport' name="ToAirport" required onChange={this.changeText}/>
                    <br/>
                    <label>Terminal</label>
                    <input type='text' placeholder='Terminal' name="Terminal" min='1' required onChange={this.changeText}/>
                    <br/>
                    <button type='submit'>Create</button>
                </form>
            </div>
        )
    }
}

export default CreateFlightForm;