import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from 'react-router';
import { Alert } from 'react-bootstrap';
const api = 'http://localhost:8000';

export default function Login(props){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [displayFlash,setFlash] = useState(false);
    const [errMsg,setErrMsg] = useState('Error');
    const history = useHistory()
    
    const handleLogin = ()=>{
        // axios.post(`${api}/login`,{username,password})
        //     .then((res)=>{
        //         console.log(res.data);
        //     })
        //     .catch((err)=>{
        //         console.log(err.response.data);
        //         if( err.response.data == 'Unauthorized')
        //             setErrMsg('The username or password is incorrect');
        //         setFlash(true)
        //     })
    }

    return(
       <div>
           {
               displayFlash &&
                <Alert variant='warning' onClose={()=>setFlash(false)} dismissible>
                    {errMsg}
                </Alert>
           }
           <h1>Login</h1>
           <input type='text' placeholder='username' name='username' onChange={(e)=>setUsername(e.target.value)}/>
           <input type='password' placeholder='password' name='password' onChange={(e)=>setPassword(e.target.value)} />
           <button onClick={handleLogin}>Login</button>
       </div>

    )
}