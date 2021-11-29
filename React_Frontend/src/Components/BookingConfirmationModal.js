import React,{useState, useEffect} from 'react'
import {Modal,Button,Container,Row,Col, ModalBody} from 'react-bootstrap';

export default function BookModal(props){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
    <>
        <Button variant="primary" onClick={handleShow}>
          TEST MODAL
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >

            <Modal.Header closeButton>
                <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                 Are you sure you want to book this flight?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                     Close
                </Button>

                 <Button variant="primary onClick={}">Confirm</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}