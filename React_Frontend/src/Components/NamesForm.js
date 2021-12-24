import React,{ useEffect,useState } from 'react';
import { Form,Row,Col,InputGroup, Container,Button,Spinner,Modal,ModalBody} from "react-bootstrap";
import {useLocation } from "react-router-dom";
export default function NamesForm(props){
return(
    <div style={{marginLeft : 50}}>
    <br/>
        <Form>
        <Form.Label style={{fontWeight: "bold", fontSize : '22px'}}>Passenger {props.passNumber}</Form.Label>
    <Row>
        <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control required placeholder="First name" type="text"/>
        </Col>
        <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control required placeholder="Last name" type="text" />
        </Col>
    </Row>
    <Row>
       
        <Form.Label>Passport Number</Form.Label>
        <Form.Control style={{marginLeft : 10}} required placeholder="Passport Number" type="number" />
        
    </Row>
</Form>
<br/>

    </div>

)
}
