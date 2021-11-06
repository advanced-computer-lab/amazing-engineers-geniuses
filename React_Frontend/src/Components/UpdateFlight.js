import React, {Component, useState, useEffect, useParams} from 'react';
import axios from 'axios';
import FlightItem from './FlightItem';
const api = 'http://localhost:8000';

export default function UpdateFlight(props) {

    const id = props.match.params;
    const [FlightNumber, setFlightNo]= React.useState(0);
    const [Departure, setDepTime] = React.useState("");
    const [Arrival, setArrTime]= React.useState([]);
    const [FlightDate, setFlightDate] = React.useState(new Date());
    const [EconomySeats, setEconomySeats] = React.useState(0);
    const [BusinessSeats,setBusniessClass]= React.useState(0);
    const [FirstClassSeats, setFirstClassSeats] = React.useState(0);
    const [FromAirport,setFromAirport]= React.useState("");
    const [ToAirport,setToAirport]= React.useState("");
    //6185882fb25028febdeb2178

    useEffect(() => {
        console.log("Id");
        console.log(id);
        //axios.get(`${api}/admin/flight/update/${id}`)

    }, [FlightNumber, Departure, Arrival, FlightDate, EconomySeats, EconomySeats, BusinessSeats, FirstClassSeats, FromAirport, ToAirport])
    
const axiosCaller = () => {
    axios.put(`${api}/admin/flight/update/${id}`, {
        
        FlightNumber: FlightNumber,
        Departure:Departure,
        Arrival:Arrival,
        FlightDate:FlightDate,
        EconomySeats:EconomySeats,
        BusinessSeats:BusinessSeats,
        FirstClassSeats:FirstClassSeats,
        FromAirport:FromAirport,
        ToAirport:ToAirport,

    }).then((res) =>{
        console.log(res, 'rssssss');
    }).catch((error)=>{
        if(error){
            console.log(error);
        };
    })


}

    return(
        <div>
            <label>Flight Number</label>
                    <input type='number' placeholder='FlightNumber' name="FlightNumber" value={FlightNumber}  required  onChange={(e) => setFlightNo(e.target.value)}/>
                    <br/>
                    <label>Departure Time</label>
                    <input type='time' name="Departure" value={Departure} required onChange={(e) => setDepTime(e.target.value)}/>
                    <br/>
                    <label>Arrival Time</label>
                    <input type='time' name="Arrival" value={Arrival} required onChange={(e) => setArrTime(e.target.value)}/>
                    <br/>
                    <label>Flight Date</label>
                    <input type='date'  name="FlightDate" value={FlightDate} required onChange={(e) => setFlightDate(e.target.value)}/>
                    <br/>
                    <label>Economy Seats</label>
                    <input type='number' placeholder='EconomySeats' name="EconomySeats" value={EconomySeats} required onChange={(e) => setEconomySeats(e.target.value)}/>
                    <br/>
                    <label>Business Seats </label>
                    <input type='number' placeholder='BusinessSeats' name="BusinessSeats" value={BusinessSeats} required onChange={(e) => setBusniessClass(e.target.value)}/>
                    <br/>
                    <label>First Class seats</label>
                    <input type='number' placeholder='FirstClassSeats' name="FirstClassSeats" value={FirstClassSeats} required onChange={(e) => setFirstClassSeats(e.target.value)}/>
                    <br/>
                    <label>From Airport </label>
                    <input type='text' placeholder='FromAirport' name="FromAirport" value={FromAirport} required onChange={(e) => setFromAirport(e.target.value)}/>
                    <br/>
                    <label>To Airport </label>
                    <input type='text' placeholder='ToAirport' name="ToAirport" value={ToAirport} required onChange={(e) => setToAirport(e.target.value)}/>     


                    <button onClick = {axiosCaller}>UPDATE</button>
        </div>
    )
}
    
