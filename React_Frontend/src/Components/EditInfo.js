import React,{useState,useEffect} from 'react';
import {Button,Row,Col} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import {useHistory, useLocation} from "react-router-dom";
const api = 'http://localhost:8000';



export default function EditInfo(props){
  const id = props.user._id;
  console.log(props.user);
  const [user,setUser] = useState(props.user);
  //const history = useHistory();

  // useEffect(() => {
  //   axios.get(`${api}/user/find/${id}`)
  //   .then((res)=>{
  //       setUser(res.data);
  //       console.log(res.data);
  //   })
  // },[id])
  
  // const updateUser=()=>{
  //   console.log(user._id);
  //   axios.put(`${api}/user/update/${user._id}`,user)
  //   .then((res) =>{
  //         console.log(res, 'update');
  //         history.push('/profile');
  //     }).catch((error)=>{
  //           console.log(error);
  //   })
  // }

  const updateUser = ()=>{
    props.updateUser(user)
  }

  //arr=[4,...arr]
  return(
  <Form>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={user.FirstName} placeholder={user.FirstName} onChange={(e)=>setUser({...user,FirstName: e.target.value})} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={user.LastName} placeholder={user.LastName} onChange={(e)=>setUser({...user,LastName: e.target.value})}/>
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formGridPassport">
      <Form.Label>Passport Number</Form.Label>
      <Form.Control type="number" placeholder={user.Passport} value={user.Passport} onChange={(e)=>setUser({...user,Passport: e.target.value})} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>E-mail</Form.Label>
      <Form.Control type="email" placeholder={user.Email} value={user.Email} onChange={(e)=>setUser({...user,Email: e.target.value})}/>
    </Form.Group>

    <Button variant="primary" onClick={updateUser}>
      Save
    </Button>
  </Form>
  );

}

