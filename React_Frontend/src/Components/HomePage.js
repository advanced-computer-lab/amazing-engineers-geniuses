import React,{useState, useEffect} from 'react'
//import { useHistory } from 'react-router';
import Slideshow from './Slideshow.js'
import Auth from '../services/Auth';
import {FontAwesomeIcon,library} from '@fortawesome/react-fontawesome'
import {faCoffee,fas} from '@fortawesome/free-solid-svg-icons'
import { Container, Row } from 'react-bootstrap';

// import SearchFlight from './SearchFlight';

export default function Homepage() {
    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser());
    // const history = useHistory();

    useEffect(() => {
       setCurrentUser(Auth.getCurrentUser());
    }, [])

    return (
        <div>
            <Slideshow/>
            {/* <SearchFlight/> */}
        
         <footer class="footer" style={{backgroundColor: '#002677', color:'white'} }>
         <br/>
        <Container>
            <Row>
                <div  class="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
		              121, Golf Island<br/>
		              Hurghada 2,Red Sea Governate 84513<br/>
		              Egypt<br/>
		              </address>
		        </div>
                      <div  class="col-8 col-sm-2">
                          <div  class="row">
                            <i class="fas fa-phone"><span>: +201206754381</span></i><br/>
                          </div>
                          <div  class="row">
                            <i class="fas fa-fax"><span>: +20224170963</span></i><br/>
                          </div>
                          <div  class="row">
                          <br/>
                          <br/>
		                    <i class="fas fa-envelope">:<a style={{textDecoration: 'none', color:'white'}} href= " mailto:amazingairlines1@outlook.com">amazingairlines1@outlook.com</a></i><br/>
                        </div> 
                </div>
                <div class="col-15 col-sm-4">
                    <div>
                        <a class="btn btn-social-icon btn-google"href="http://google.com/+"><i style={{color:'white'}} class="fab fa-google"></i></a>
                        <a class="btn btn-social-icon btn-facebook"href="http://www.facebook.com/profile.php?id="><i style={{color:'white'}} class="fab fa-facebook-square"></i></a>
                        <a class="btn btn-social-icon btn-linkedin"href="http://www.linkedin.com/in/"><i style={{color:'white'}} class="fab fa-linkedin-in"></i></a>
                        <a class="btn btn-social-icon btn-twitter"href="http://twitter.com/"><i style={{color:'white'}} class="fab fa-twitter"></i></a>
                        <a class="btn btn-social-icon btn-youtube"href="http://youtube.com/"><i style={{color:'white'}} class="fab fa-youtube"></i></a>
                        <a class="btn btn-social-icon"href="mailto:"><i style={{color:'white'}} class="fas fa-envelope"></i></a>
                    </div>
                </div>
           </Row>
           
        </Container>
    </footer>

  
    </div>
    
    )
}
