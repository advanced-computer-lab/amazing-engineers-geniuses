import React,{useState,useEffect} from 'react';
import { Card,Row,Container,Button} from 'react-bootstrap';  

export default function ShowUser(props){
    const [user,setUser] = useState(props.user);
    
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
                </Row>
            </Card>
            </Container>
        </div>

        
       
    );
}