import React,{useState,useEffect} from 'react';
import { Card,ListGroup,Row,Col} from 'react-bootstrap';  

export default function ShowUser(props){
    const [user,setUser] = useState(props.user);
    
    useEffect(()=>{
        setUser(props.user);
    },[props.user])

    return(
       <div><h4>
        <Card >
         <ListGroup variant="flush">
              <ListGroup.Item>Username:<em> {user.username}</em></ListGroup.Item>
              <ListGroup.Item>First Name:<em> {user.FirstName}</em></ListGroup.Item>
              <ListGroup.Item>Last Name:<em> {user.LastName}</em></ListGroup.Item>
              <ListGroup.Item>Passport Number:<em> {user.Passport}</em></ListGroup.Item>
              <ListGroup.Item>Email:<em> {user.Email}</em></ListGroup.Item>
         </ListGroup>
        </Card></h4>
       </div>
    )
}