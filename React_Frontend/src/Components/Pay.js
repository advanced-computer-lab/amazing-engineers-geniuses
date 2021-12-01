
import React,{useState,useEffect} from 'react';
import {Form,Button,Modal,Row,Col} from 'react-bootstrap';


export default function Pay(props){


    return(
       
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="CreeditCardNumber">
                            <Form.Label>Credit Card Number</Form.Label>
                            <Form.Control type="number" placeholder="XXXX XXXX XXXX XXXX"  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="CardHolder">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control type="text" placeholder=""  />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="ExpDate">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" placeholder="mm/yy"  />
                        </Form.Group>
                        <Form.Group as={Col} controlId="CVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="number" placeholder="ex:123"  />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    
}