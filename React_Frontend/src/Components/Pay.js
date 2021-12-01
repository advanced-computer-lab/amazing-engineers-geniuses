
import React,{useState,useEffect} from 'react';
import {Form,Button,Modal,Row,Col} from 'react-bootstrap';
import Invoice from './Invoice';

export default function Pay(props){

    const [paymentDetails, setPayment] = useState({
        CreditCard: '',
        Name: '',
        Date: '',
        CVV:''
    })

    const createBooking= (e)=>{
        e.preventDefault();
        props.Book();
    }
    
    return(
       
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide = {props.onHide}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Payment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='payForm' onSubmit={createBooking}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="CreditCardNumber">
                            <Form.Label>Credit Card Number</Form.Label>
                            <Form.Control required type="number" maxLength="16" minLength="16" placeholder="XXXX XXXX XXXX XXXX"  onChange={(e)=>setPayment({...paymentDetails, CreditCard: e.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="CardHolder">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control required type="text" placeholder="" onChange={(e) => setPayment({ ...paymentDetails, Name: e.target.value })}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="ExpDate">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control required type="month" placeholder="mm/yy" onChange={(e) => setPayment({ ...paymentDetails, Date: e.target.value })}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="CVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control required type="number" maxLength="3" minLength="3" placeholder="ex:123" onChange={(e) => setPayment({ ...paymentDetails, CVV: e.target.value })}/>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button type='submit' className='btn btn-primary' form='payForm'>{'Pay & Confirm Booking'}</button>
            </Modal.Footer>
            </Modal>
        );
    
}