import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { makeStyles } from "@mui/styles";
import Modal from '@mui/material/Modal';
import { useHistory } from "react-router-dom";
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import "../Styles/NewBooking.css";
const api = 'http://localhost:8000';




export default function Booking (props) {
    let history = useHistory();
    const[retPrice, setRetPrice] = React.useState(0);
    const[depPrice, setDepPrice] = React.useState(0);

    function getClass2(CabinClass){
      if(CabinClass ==='E'){
          return 'Econ';
      }
      else if(CabinClass === 'F'){
          return 'First';
      }
      else if (CabinClass === 'B'){
          return 'Bus';
      }
      return 'Error in getClass()';
  }
  

    useEffect(()=>{
      console.log(props.departureDate, "hohoho");
      console.log(props.returnExists, "hohoho");
      // getRetPrice();
 }
,[])

    
    function editBooking(){        
        history.push({
            pathname: '/editBooking',
            state: {booking:props.booking, fromAirport:props.departureFromAirport, toAirport:props.returnFromAirport, 
            date:props.date, returnDate:props.returnDate, arrDep:props.arrDep, arrRet:props.arrRet, depFlightDepTime:props.depFlightDepTime,
            depFlightArrTime:props.depFlightArrTime, retFlightDepTime:props.retFlightDepTime, retFlightArrTime:props.retFlightArrTime}
        });
      }


  
  if(!props.returnExists){
    return (
      <Box style = {{overflow: 'hidden'}}sx={{ minWidth: 275 }}>
        <div class = "singlemainCard">
         <div class="row">
          <div class="col-sm-6">
            <div class="singlebookingcard">
              <div class="singlebookingcard-body">
                <h5 class="singlebookingcard-title">One way trip</h5>
                <div id = "cardsContainer" style={{display: "flex"}}>
                  <div id = "singledepartureCard" class="bookingcard">
                    <div class="singledeparture-bookingcard-body">
                      <h5 style={{marginLeft : "7vw"}} class="singledeparture-bookingcard-title">Departure Flight</h5> 
                        <div class="infoDiv">
                          <ul style={{marginTop: "3vw",marginLeft : "4.8vw"}}>From: <span class = "infoSpan">{props.departureFromAirport}</span> </ul>
                          <ul style={{marginLeft : "4.8vw"}}>To: <span class = "infoToSpan">{props.departureToAirport}</span></ul>
                          <ul style={{marginLeft : "4.8vw"}}>Date: <span class = "infoSpan">{props.departureDate}</span></ul>
                          <ul style={{marginLeft : "4.8vw"}}>Price: <span class = "infoSpan">{props.departureCost} EGP</span></ul>
                        </div>
                        {/* <button class = "cancelbtn" onClick = {props.cancelDepartureClicked} type="button">cancel flight</button> */}
                        {/* <Button onClick={props.handleConfirmOpen} className = {classes.cancelButton} size="small">Cancel</Button> */}
                    </div>
                 </div>
                  
                 </div>
                 <button class = "proceedbtn" onClick = {editBooking} type="button">Trip details</button>
                 <button  onClick={props.handleConfirmOpen} class = "cancelbtn" type="button">Cancel Booking</button>
                  {/* <button class = "cancelbtn" onClick = {props.cancelDepartureClicked} type="button">cancel flight</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </Box>
    );
  }
  else{
  return (
    <Box style = {{overflow: 'hidden'}}sx={{ minWidth: 275 }}>
      <div class = "mainCard">
       <div class="row">
        <div class="col-sm-6">
          <div class="bookingcard">
            <div class="bookingcard-body">
              <h5 class="bookingcard-title">Two way trip</h5>
              <div id = "cardsContainer" style={{display: "flex"}}>
                <div id = "departureCard" class="bookingcard">
                  <div class="departure-bookingcard-body">
                    <h5 class="departure-bookingcard-title">Departure Flight</h5> 
                      <div class="infoDiv">
                        <ul>From: <span class = "infoSpan">{props.departureFromAirport}</span> </ul>
                        <ul>To: <span class = "infoToSpan">{props.departureToAirport}</span></ul>
                        <ul>Date: <span class = "infoSpan">{props.departureDate}</span></ul>
                        <ul>Price: <span class = "infoSpan">{props.departureCost} EGP</span></ul>
                      </div>
                      {/* <button class = "cancelbtn" onClick = {props.cancelDepartureClicked} type="button">cancel flight</button> */}
                      {/* <Button onClick={props.handleConfirmOpen} className = {classes.cancelButton} size="small">Cancel</Button> */}
                  </div>
               </div>
                <div id = "returnCard" class="bookingcard">
                  <div class="return-bookingcard-body">
                    <h5 class="return-bookingcard-title">Return Flight</h5> 
                      <div class="infoDiv">
                        <ul>From: <span class = "infoSpan">{props.returnFromAirport}</span></ul>
                        <ul>To: <span class = "infoToSpan">{props.returnToAirport}</span></ul>
                        <ul>Date: <span class = "infoSpan">{props.returnDate}</span></ul>
                        <ul>Price: <span class = "infoSpan">{props.returnCost} EGP</span></ul>
                      </div>
                      {/* <button class = "cancelbtn" onClick = {props.cancelReturnClicked} type="button">cancel flight</button> */}
                  </div>
               </div>
               </div>
               <button class = "proceedbtn" onClick = {editBooking} type="button">Trip details</button>
               <button  onClick={props.handleConfirmOpen} class = "cancelbtn" type="button">Cancel Booking</button>
                {/* <button class = "cancelbtn" onClick = {props.cancelDepartureClicked} type="button">cancel flight</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Box>
  );
  }  
 
}

