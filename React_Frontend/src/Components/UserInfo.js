import React,{useState} from 'react';
import axios from 'axios';
import { Col, Row, Form,Button } from 'react-bootstrap';
import '../Styles/UserInfo.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Auth from '../services/Auth';
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
const api = 'http://localhost:8000'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function UserInfo(){
    const [userInfo, setUserInfo] = React.useState({FirstName:"", LastName:"", Address:"", PassportNumber:"", Email:"",
    CountryCode:"", PhoneNumber: "" })
    const [open, setOpen] = React.useState(false);
    const [AlertText, setAlertText] = React.useState("");
    const curUser = Auth.getCurrentUser();
    const history = useHistory()
    const location = useLocation();

    const handleClick = (e) => {
        e.preventDefault();
        const emailText = userInfo.Email;
        const regex = new RegExp('.+@.+\..+');
        if(userInfo.FirstName == ""){
            setAlertText("First name cannot be empty")
            setOpen(true);
        }
        else if(userInfo.LastName == ""){
            setAlertText("Last name cannot be empty")
            setOpen(true);
        }
        else if(userInfo.PassportNumber == ""){
            setAlertText("passport number cannot be empty")
            setOpen(true);
        }
        else if(userInfo.Email == ""){
            setAlertText("email cannot be empty")
            setOpen(true);
        }
        else if(!regex.test(emailText)){
            setAlertText("email should be in the form of someone@example.com")
            setOpen(true);
        }
        else{
            axios.post(`${api}/auth/updateInfo`, {
                userId: curUser.id,
                firstName: userInfo.FirstName,
                lastName: userInfo.LastName,
                passportNumber: userInfo.PassportNumber,
                countryCode: userInfo.CountryCode,
                phoneNumber: userInfo.PhoneNumber,
                address: userInfo.Address,
                email: userInfo.Email
            })
                .then((res) => {
                    console.log(res, "res hereee");   
                    console.log(location.state.userName);   
                    console.log(location.state.userPassword);
                    Auth.login(location.state.userName, location.state.userPassword)
                    .then((res)=>{
                        history.push('/');
                        window.location.reload();
                        console.log(Auth.curUser, "cur useerr");                    }).catch((err)=>{
                            //console.log(err.response);
                        })
                   

                }).catch((error) => {
                    if(error){
                        console.log(error);
        }
    })
    // console.log(curUser);
    // console.log(userInfo.FirstName);
        }

    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    return(
        <div class = "main" >
            <p class = "greeting">We would like to get to know you better!</p>
           <Form id = "userInfoForm" >
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                onChange={e => {userInfo.FirstName = e.target.value; console.log(userInfo.FirstName, "first name ")}}
                // value = {userInfo.FirstName} 
                placeholder="First Name"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last Name" 
                 onChange={e => {userInfo.LastName = e.target.value; console.log(userInfo.LastName, "last name")}}
                />
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type = "email" placeholder="Country, state, city, street" 
                 onChange={e => {userInfo.Address = e.target.value; console.log(userInfo.Address, "address")}}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Passport number</Form.Label>
                <Form.Control placeholder=""
                 onChange={e => {userInfo.PassportNumber = e.target.value; console.log(userInfo.PassportNumber, "passport")}} />
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Email</Form.Label>
                <Form.Control type = "email" 
                 onChange={e => {userInfo.Email = e.target.value; console.log(userInfo.Email, "email")}}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Country Code</Form.Label>
                <Form.Control type = "email" 
                 onChange={e => {userInfo.CountryCode = e.target.value; console.log(userInfo.CountryCode, "email")}}/>  
                {/* <Form.Select defaultValue="Choose...">
                    <option>Country Code</option>
                    <option>...</option>
                </Form.Select> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                 onChange={e => {userInfo.PhoneNumber = e.target.value; console.log(userInfo.PhoneNumber, "phone number")}} />
                </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

{/* agree to receive emails */}
            <Button style = {{marginLeft: "28vw", marginTop: "1vw"}} class = "userInfoButton" onClick = {handleClick}id = "button" type="submit">
                Submit
            </Button>
        </Form>
        <div class = "snackbar-root">
        <Snackbar class = "snackbar" open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert style={{textAlign: "center"}} onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {AlertText}
                </Alert>
        </Snackbar>
        </div>
    </div>
    )
}