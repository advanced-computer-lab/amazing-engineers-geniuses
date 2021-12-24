import React,{  useEffect,useState } from 'react';
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import { Row, Col, Alert,Button, Modal, Spinner,Container} from 'react-bootstrap';
import ChooseSeats from './ChooseSeats';
import FlightSummary from './FlightSummary';
import { useLocation,useHistory } from "react-router-dom";
import Auth from '../services/Auth';
import axios from 'axios';
import NamesForm from './NamesForm';
export default function NamesModal(props){

  let names=mapNamesForms();

  function mapNamesForms(){
    let result = [];
    for(let i=0;i<3;i++){
      result=[...result,(<NamesForm passNumber={i+1}/>)]
    }
    console.log(result);
    return result;
  }
  console.log(names);
  
return(
  <div>
    {names}
  </div>
)}