import React,{useState} from 'react';
import axios from 'axios'
import {Form,Modal,Row,Col} from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout'
import Auth from '../services/Auth';
const api = 'http://localhost:8000'

export default function Pay(props){

    const [holderName, setHolderName] = useState("");
    const [paymentDetails, setPayment] = useState({
        CreditCard: '',
        Name: '',
        Date: '',
        CVV:''
    })
    const curUser = Auth.getCurrentUser();

    const createBooking= ()=>{
        console.log("here");
        // e.preventDefault();
        console.log("there");
        props.Book();
    }
    const cost = props.price;
    const [product, setProduct] = React.useState({
        name: "Flight reservation",
        price: cost,
    })

    const makePayment = (token) => {
        const body = {
            token, 
            product
        }
        const headers = {
            "Content-type":"application/json"
        }
        axios.post(`${api}/user/makePayment`, {
            token,
            product
        })
        .then((res) => {
            console.log(res, "responsee");
            // console.log(res.data);
            const {status} = res;
            if(res.status == 200){
                sendMail(token.email);
                createBooking();
            }
            console.log(status, "status");
        }).catch((error) => {
            if(error){
                console.log(error);
            }
        })
    }   
    
    const sendMail = (inputEmail) =>{
        axios.post(`${api}/user/sendConfirmation`, {email: inputEmail, emailSubject: "Transaction completed" , 
        emailBody:  
        "Dear " + holderName +
        "We have just received a payment of " + props.price + "EGP. Listed below are the details of your booking" + "\n"
        + "\n" + "\n"
        + "Departure Date: " + props.bookingDetails.DepartureFlight.DepDate.substring(0,10) + "\n" 
        + "Arrival Date: " + props.bookingDetails.DepartureFlight.ArrDate.substring(0,10) + "\n" 
        + "Return Flight Departure Date: " + props.bookingDetails.ReturnFlight.DepDate.substring(0,10) + "\n" 
        + "Return Flight Arrival Date: " + props.bookingDetails.ReturnFlight.ArrDate.substring(0,10) + "\n" 
        + "Departing Flight cabin class: " + props.bookingDetails.DepCabinClass + "\n" 
        + "Returning Flight cabin class: " + props.bookingDetails.RetCabinClass + "\n" 
        + "Departing Flight seats: " + props.bookingDetails.DepSeats + "\n" 
        + "Returning Flight seats: " + props.bookingDetails.RetSeats + "\n" 
        + "Number of passengers: " + props.bookingDetails.NumberOfPassengers + "\n" 
        + "Adult passengers: " + props.bookingDetails.AdultPassengers + "\n" 
        + "Kid passengers: " + props.bookingDetails.KidPassengers + "\n" 
        + "Total cost: " + props.bookingDetails.TotalCost + " EGP" + "\n" + "\n" + "\n" 
        + "Thank you for using Amazing Airlines." + "\n" + "We hope you enjoy your first and probably last flight."
        + "\n" + "Brought to you by Khaled, Amira, Shahd, Mohannad and David"
        + "\n" + "\n" + "\n" + "For more information, please visit our website, it took alot of effort to make."
        })
            .then((res) => {
                console.log("email sent")
                console.log(res.data)
            }).catch((error) =>{
                if(error){

            console.log(error);
        }
    })
  
 
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
                <Modal.Title  id="contained-modal-title-vcenter" style = {{marginLeft: "20vw"}}>
            
                Payment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='payForm' onSubmit={createBooking}>
                    {/* <Row className="mb-3">
                        <Form.Group as={Col} controlId="CreditCardNumber">
                            <Form.Label>Credit Card Number</Form.Label>
                            <Form.Control required type="number" maxLength="16" minLength="16" placeholder="XXXX XXXX XXXX XXXX"  onChange={(e)=>setPayment({...paymentDetails, CreditCard: e.target.value})}/>
                        </Form.Group>
                    </Row> */}
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="CardHolder">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control required type="text" placeholder="" onChange={(e) => setHolderName(e.target.value )}/>
                        </Form.Group>
                    </Row>
                    {/* <Row className="mb-3">
                        <Form.Group as={Col} controlId="ExpDate">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control required type="month" placeholder="mm/yy" onChange={(e) => setPayment({ ...paymentDetails, Date: e.target.value })}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="CVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control required type="number" maxLength="3" minLength="3" placeholder="ex:123" onChange={(e) => setPayment({ ...paymentDetails, CVV: e.target.value })}/>
                        </Form.Group>
                    </Row> */}
                   
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
            <i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i><i class="fab fa-cc-paypal"></i><i class="fab fa-cc-apple-pay"></i>
                {/* <button type='submit' className='btn btn-primary' form='payForm'>{'Confirm'}</button> */}
            </Modal.Footer>
            <StripeCheckout
                stripeKey = "pk_test_51K9XNPDekJuw28Lw9oFt01JHaSPU9R9XTIJZU7wO8JnQysdooTfLHjSSkdtB2R9WNOhCeorqpUcv0sMHkZ6qnI0z00y90wAVWu"  
                token = {makePayment}
                name = "Book flight"
                amount = {props.price * 100}
            />
            </Modal>
        );
    
}