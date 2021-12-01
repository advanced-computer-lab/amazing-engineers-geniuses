import React,{useState,useEffect} from 'react';
import {Form,Button,Modal,Row,Col} from 'react-bootstrap';

export default function Invoice(props){


    const [show, setShow] = useState(false);
    
    return (
        <>
        <Button variant="primary" onClick={() => setShow(true)}>
            Invoice
        </Button>
    
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="InvoiceModal"
        >
            <Modal.Header closeButton>
            <Modal.Title id="InvoiceModal">
                Summary
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                <h1>Outbound:</h1>
                <Card >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Dep: </ListGroup.Item>
                        <ListGroup.Item>Arr: </ListGroup.Item>
                        <ListGroup.Item>From: </ListGroup.Item>
                        <ListGroup.Item>To: </ListGroup.Item>
                        <ListGroup.Item>Flight: </ListGroup.Item>
                        <ListGroup.Item>Person, Seat: ,(eco/bus)</ListGroup.Item>
                    </ListGroup>
                </Card>
                <h1>inbound:</h1>
                <Card >
                    <ListGroup variant="flush">
                        <ListGroup.Item>Dep: </ListGroup.Item>
                        <ListGroup.Item>Arr: </ListGroup.Item>
                        <ListGroup.Item>From: </ListGroup.Item>
                        <ListGroup.Item>To: </ListGroup.Item>
                        <ListGroup.Item>Flight: </ListGroup.Item>
                        <ListGroup.Item>Person, Seats: ,(eco/bus)</ListGroup.Item>
                    </ListGroup>
                </Card>
            </p>
            </Modal.Body>
        </Modal>
        </>
    );
    
    render(<Invoice/>);
}