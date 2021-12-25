import React,{useState,useEffect} from 'react';
import { Card,Row,Container,Button, Modal, Form} from 'react-bootstrap';
import '../Styles/changePass.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Auth from '../services/Auth';
import axios from 'axios';
const api = 'http://localhost:8000'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

// function MyVerticallyCenteredModal(props) {
//     return (
      
//     );
//   }
  

export default function ShowUser(props){
    const [user,setUser] = useState(props.user);
    const [modalShow, setModalShow] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [open, setOpen] = React.useState(false); 
    const [openSuccess, setOpenSuccess] = React.useState(false); 
    const [alertText, setAlertText] = React.useState("");


    const currentUser = Auth.getCurrentUser();
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    const updatePassword = async(e) =>{
        e.preventDefault();
        if(newPassword!==confirmNewPassword){
            console.log("passwords dont match");
            setAlertText("new passwords do not match")
            setOpen(true);
        }
        else{
            await axios.post(`${api}/auth/changepassword`, {
                id: currentUser.id,
                password: currentPassword,
                newPassword: newPassword
            })
           .then((res) => {
               if(res.data.error){
                setAlertText("current password is wrong");
                setOpen(true);
               }
               else{
                setAlertText("password successfuly changed");
                setOpenSuccess(true);
                console.log(res.data)
                setModalShow(false);
                console.log("password changed")
               }
           }).catch((error) =>{
               if(error){
                   e.preventDefault();                 
               }
           })
       }
            console.log(newPassword,"new");
            console.log(confirmNewPassword, "confirm");
        }
    
    
    useEffect(()=>{
        setUser(props.user);
    },[props.user])

    return(
       <div>
           <Container>
               <br/>
            <Card style={{maxWidth: '400px', margin: '0 auto'}}>
                <Row style={ {paddingLeft: '30px'}}>
                  <Card.Body>
                    <Card.Title ><em>My Profile</em></Card.Title>
                    <hr/>
                
                     <Card.Title > <i class="fas fa-user"></i> {"Username: "} </Card.Title>
                     <Card.Subtitle style={ {paddingLeft: '30px'}} className="mb-2 text-muted">{user.username}</Card.Subtitle>
                    <hr/>
                    <Card.Title > {"First Name: "} </Card.Title>
                    <Card.Subtitle style={ {paddingLeft: '15px'}} className="mb-2 text-muted">  {user.FirstName}</Card.Subtitle>
                    <Card.Title > {" Last Name: "} </Card.Title>
                    <Card.Subtitle style={ {paddingLeft: '15px'}} className="mb-2 text-muted">{user.LastName}</Card.Subtitle>
                    <Card.Title > <i class="fas fa-passport"></i> {" Passport Number: "} </Card.Title>
                    <Card.Subtitle style={ {paddingLeft: '30px'}} className="mb-2 text-muted">  {user.Passport}</Card.Subtitle>
                    <Card.Title > <i class="fas fa-envelope"></i> {" Email: "} </Card.Title>
                    <Card.Subtitle  style={ {paddingLeft: '30px'}}className="mb-2 text-muted"> {user.Email}</Card.Subtitle>
                </Card.Body>
                </Row>
                <Row>
                <Button style={ {width: '100%',marginLeft: '12px', borderRadius:'0 0 4px 4px'}} onClick={()=> props.setDisplay('edit')}>Edit</Button>
                <Button onClick={() => setModalShow(true)} id = "changePassButton" style={ {width: '100%',marginLeft: '12px', borderRadius:'0 0 4px 4px'}}>Change Password</Button>
                {/* <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}
                </Row>
            </Card>
            </Container>
            <Modal
                id = "changePassModal"
                    style 
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Password
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control onChange={e => {setCurrentPassword(e.target.value); console.log(currentPassword)}} type="password" placeholder="Enter current password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control onChange={e => {setNewPassword(e.target.value); console.log(newPassword)}} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control onChange={e => {setConfirmNewPassword(e.target.value); console.log(confirmNewPassword)}} type="password" placeholder="Confirm New Password" />
                        </Form.Group>
                        <Button style = {{marginLeft: "15vw"}}onClick={updatePassword}  variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </Modal.Body>
                
                </Modal>
                <div class = "snackDiv">
                <Snackbar style ={{marginLeft:"37vw"}} open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert id = "alertbar" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {alertText}
                    </Alert>
                </Snackbar>
                <Snackbar style ={{marginLeft:"37vw"}} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert id = "alertbar" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {alertText}
                    </Alert>
                </Snackbar>
                </div>
        </div>

        
       
    );
}