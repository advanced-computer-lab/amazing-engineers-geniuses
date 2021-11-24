import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import Auth from '../services/Auth';


export default function Homepage() {
    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser());
    const history = useHistory();

    useEffect(() => {
       setCurrentUser(Auth.getCurrentUser());
    }, [])

    const logout = ()=>{
        Auth.logout();
        setCurrentUser(Auth.getCurrentUser());
    }

    return (
        <div>
            <h1>Welcome to Amazing Air <em>{currentUser.username}</em></h1>
            <a href = "/flightSchedule">Flight Schedule</a>
            <br/>
            {currentUser.username == 'Guest' ? <a href = "/login">Login</a> : <button onClick={logout}>Logout</button>}
            <br/>
            <a href = "/register">Register</a>
            
        </div>
    )
}
