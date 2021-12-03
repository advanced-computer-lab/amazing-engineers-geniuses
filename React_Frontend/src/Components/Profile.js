import React,{useState,useEffect} from 'react';
import EditInfo from './EditInfo';
import ShowUser from './ShowUser';
import Auth from '../services/Auth';
import axios from 'axios';
import {Spinner} from 'react-bootstrap'
const api = 'http://localhost:8000';

export default function Profile(){  
    const [user, setUser] = useState(Auth.getCurrentUser());
    const [display, setDisplay]=useState('show');
    const [showSpinner, setSpinner] = useState(true);

    useEffect(() => { //Get user using id stored in token
        console.log('token userId', Auth.getCurrentUser().id);
        axios.get(`${api}/user/find/${Auth.getCurrentUser().id}`)
            .then((res)=>{
            setUser(res.data); //set user state with full user from DB key=_id now instead of id
            setSpinner(false)
            console.log(res.data)
        })

    },[display])

    const updateUser = (update) => {
        setSpinner(true)
        console.log(user._id);
        console.log(update);
        axios.put(`${api}/user/update/${user._id}`, update)
            .then((res) => {
                console.log('update',res);
                //setUser(res.data);
                setDisplay('show');
                setSpinner(false)
            }).catch((error) => {
                console.log(error);
            })
    }
    
   
    return(
    <> 
        {showSpinner && 
            <div className="pos-center text-primary" style={{width: '100px', height: '100px'}} >   
              <Spinner animation="border" />
              <span >Loading...</span>
              {/* </Spinner> */}
            </div>}
        {display === 'show' && !showSpinner &&
            <div>
                <ShowUser setDisplay={setDisplay} user={user} />
                <br/>
                {/* <Button  style={{marginLeft:' 100px'}}onClick={()=>setDisplay('edit')}>Edit</Button> */}
            </div>}
        {display === 'edit' && !showSpinner && <EditInfo user={user} updateUser={updateUser} />}
        
    </>
 
    );

}