import React,{useState} from 'react';
import {Button,Row,Col,Card,Container } from 'react-bootstrap';
import {Form} from 'react-bootstrap';



export default function EditInfo(props){
  console.log(props.user);
  const [user,setUser] = useState(props.user);

  const updateUser = ()=>{
    props.updateUser(user)
  }
  return(

    
    <Form>
      <Container>
          <br/>
          <Card style={{maxWidth: '350px' , margin:"auto"}}>
              <Row style={ {paddingLeft: '30px'}}>
                <Card.Body>
                  <Card.Title ><em> Edit My Profile</em></Card.Title>
                  <hr/>
                 
                  <Card.Title > <i class="fas fa-user"></i> {"Username: "} </Card.Title>
                  <Card.Subtitle style={ {paddingLeft: '30px'}} className="mb-2 text-muted">{user.username}</Card.Subtitle> 
                  
                  <hr/>
                  <Form.Group  as={Col} controlId="formGridFirstName">
                  <Card.Title > {"First Name: "} </Card.Title>
                  <Form.Control  type="text" value={user.FirstName} placeholder={user.FirstName} onChange={(e)=>setUser({...user,FirstName: e.target.value})} />
                  </Form.Group>
                  <br/>

                  <Form.Group as={Col} controlId="formGridLastName">
                  <Card.Title > {" Last Name: "} </Card.Title>
                  <Form.Control type="text" value={user.LastName} placeholder={user.LastName} onChange={(e)=>setUser({...user,LastName: e.target.value})}/>
                  </Form.Group>
                  <br/>
                  
                  <Form.Group className="mb-3" controlId="formGridPassport">
                  <Card.Title > <i class="fas fa-passport"></i> {" Passport Number: "} </Card.Title>
                  <Form.Control type="number" placeholder={user.Passport} value={user.Passport} onChange={(e)=>setUser({...user,Passport: e.target.value})} />
                  </Form.Group>
                  <br/>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                  <Card.Title > <i class="fas fa-envelope"></i> {" Email: "} </Card.Title>
                  <Form.Control type="email" placeholder={user.Email} value={user.Email} onChange={(e)=>setUser({...user,Email: e.target.value})}/>
                  </Form.Group>
                  <br/>

              </Card.Body>
              </Row>
              <Row>
              <Button style={ {marginLeft: '12px', borderRadius:'0 0 4px 4px'}}  onClick={updateUser}>Update</Button>
              </Row>
          </Card>
          </Container>
      </Form>
  
 
  );

}

