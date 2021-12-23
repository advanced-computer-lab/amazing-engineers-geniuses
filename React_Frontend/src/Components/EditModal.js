import React,{ useEffect,useState } from 'react';
import { Form,Row,Col,InputGroup, Container,Button,Spinner,Modal,ModalBody} from "react-bootstrap";
import {useLocation } from "react-router-dom";


export default function EditModal(props){

const location = useLocation();
const[showEditDep,setShowEditDep]=useState(props.showEditDep); //location.state?

useEffect(() => {
    console.log(showEditDep);
},[]) 

return(
  //onHide={props.onHide}
    <Modal
    {...props}
    backdrop="static"
    keyboard={false}
    show={showEditDep}
    onHide={() => setShowEditDep(false)} 
    
  >
    <Modal.Header closeButton>
      <Modal.Title>Edit Flight</Modal.Title>
    </Modal.Header>

    <Modal.Body>AAAAAAAAAAAAAAAAA</Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={()=> setShowEditDep(false)}>
        Close
      </Button>

      <Button
        variant="primary"
        //onClick={showPayModal}
        onClick={() => {}}
      >
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>

)

}