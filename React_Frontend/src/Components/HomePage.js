import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import Slideshow from './Slideshow.js'
import Auth from '../services/Auth';
import SearchFlight from './SearchFlight';

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
            <Slideshow/>
            {/* <SearchFlight/> */}
            
            

        </div>
    )
}
