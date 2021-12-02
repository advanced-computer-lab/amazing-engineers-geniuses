import React, {useState} from 'react'
import { useHistory } from 'react-router';
import { Alert,Form,Button } from 'react-bootstrap';
import Auth from '../services/Auth';

export default function Register(props){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [displayFlash,setFlash] = useState(false);
    const [errMsg,setErrMsg] = useState('Error');
    const history = useHistory()
    
    const handleRegister = ()=>{
        Auth.register(username,password)
            .then((res)=>{
                console.log(res.data);
                history.push('/');
            })
            .catch((err)=>{
                //console.log(err.response);
                setErrMsg(err.response.data.message);
                setFlash(true)
            })
    }

    return(
       <div>
           {
               displayFlash &&
                <Alert variant='warning' onClose={()=>setFlash(false)} dismissible>
                    {errMsg}
                </Alert>
           }
           <h3 style={{textAlign:'center'}}>Register</h3>
           {/* <input type='text' placeholder='username' name='username' onChange={(e)=>setUsername(e.target.value)}/>
           <input type='password' placeholder='password' name='password' onChange={(e)=>setPassword(e.target.value)} />
           <button onClick={handleRegister}>Register</button> */}
           <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
       </div>

    )
}