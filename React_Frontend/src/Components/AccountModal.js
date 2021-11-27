import React from 'react';
import {Modal,Button,Container,Row,Col, ModalBody} from 'react-bootstrap';
import Login from './Login';
//import Register from './Register';

export default function AccountModal(props){
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Account
                </Modal.Title>
            </Modal.Header>
            <ModalBody style={{padding:'30px'}}>
                <Container>
                    <Row>
                        <Col>
                            <Login/>
                        </Col>
                        <Col style={{borderLeft: 'thin solid black'}}>
                            <div>
                                <h3 style={{fontWeight:600, marginBottom:'20px', color:'darkblue'}}>Register</h3>
                                <h5>Create an account today!</h5>
                                <ul>
                                    <li>View and manage upcoming flights</li>
                                    <li>Receive our latest news and special offers</li>
                                    <li>Earn or redeem miles and enjoy benefits with Miles+Bonus</li>
                                </ul>
                                <Button variant='primary' href='/register'>Create Account</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            
        </Modal>
    )
}