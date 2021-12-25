import React,{useState, useEffect} from 'react'
//import { useHistory } from 'react-router';
import Slideshow from './Slideshow.js'
import Auth from '../services/Auth';
import {FontAwesomeIcon,library} from '@fortawesome/react-fontawesome'
import {faCoffee,fas} from '@fortawesome/free-solid-svg-icons'
import { Container, Row } from 'react-bootstrap';
import Footer from './Footer.js';

// import SearchFlight from './SearchFlight';

export default function Homepage() {
    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser());
    // const history = useHistory();

    useEffect(() => {
       setCurrentUser(Auth.getCurrentUser());
    }, [])

    return (
        <div style={{backgroundColor: '#002677'}}>
            <Slideshow/>
            {/* <SearchFlight/> */}
        

        <Footer/>

  
    </div>
    
    )
}
