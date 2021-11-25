import React,{useState,useEffect} from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Auth from '../services/Auth';
import AccountModal from './AccountModal';
import "../Styles/NavBar.css";

export default function NavBar(){
    const [modalShow,setModalShow] = useState(false);
    const [showPlan, setPlan] = useState(false);
    const [showAcc, setAcc] = useState(false);
    const [currentUser,setCurrentUser] = useState(Auth.getCurrentUser());

    const showDropdown = (e)=>{
        // console.log(e.target.id);
        if(e.target.id === 'plan-dropdown')
            setPlan(!showPlan);
        else{
            if(e.target.id === 'acc-dropdown')
                setAcc(!showAcc)
        }
           
    }

    useEffect(() => {
       setCurrentUser(Auth.getCurrentUser());
    }, [])

    const logout = ()=>{
        Auth.logout();
        setCurrentUser(Auth.getCurrentUser());
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container style={{maxWidth:'90%'}}>
                    <Navbar.Brand href="/">
                        <svg id='logo' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={50} height={50} viewBox="0 0 172 172" style={{fill: '#000000'}}>
                        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#ffffff"><path d="M148.35,37.84c-5.95281,0 -12.05344,1.30344 -18.06,3.9775l-97.18,43.43c-0.28219,0.13438 -0.55094,0.215 -0.7525,0.215c-0.80625,0 -2.20375,-1.11531 -3.44,-2.0425c-4.64937,-3.42656 -11.42187,-8.34469 -13.545,-9.9975c-1.59906,-1.22281 -3.81625,-1.935 -6.235,-1.935c-3.57437,0 -6.54406,1.42438 -8.0625,3.7625c-1.23625,1.90813 -1.45125,4.25969 -0.43,6.5575l12.255,27.1975c1.47813,3.31906 5.30781,7.31 15.1575,7.31c11.20688,0 28.595,-5.16 50.31,-14.835l4.515,-2.0425l-7.8475,42.0325c-0.94062,3.77594 -0.80625,6.3425 0.5375,8.0625c0.86,1.10188 2.15,1.72 3.5475,1.72c0.69875,0 1.42438,-0.1075 2.15,-0.43l5.375,-2.365c4.04469,-1.80062 8.37156,-7.37719 10.32,-11.61l25.585,-55.3625c48.95281,-22.92437 51.15656,-27.77531 49.02,-32.5725c-2.45906,-5.49594 -11.19344,-11.0725 -23.22,-11.0725zM47.73,44.505c-1.935,0 -4.71656,0.215 -6.88,1.1825l-5.375,2.365c-1.77375,0.79281 -2.94281,2.31125 -3.01,4.085c-0.1075,3.31906 3.26531,5.42875 5.59,6.665l15.8025,9.675l31.175,-13.975l-28.81,-8.815c-2.60687,-0.79281 -5.56312,-1.1825 -8.4925,-1.1825z" /></g></g></svg>
                        Amazing Airlines</Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavDropdown title="Plan" id="plan-dropdown" show={showPlan} onMouseEnter={showDropdown} onMouseLeave={(e)=>setPlan(false)}>
                            <NavDropdown.Item href="/flightSchedule" eventKey="1.1">Flight Schedule</NavDropdown.Item>
                            <NavDropdown.Item eventKey="1.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item eventKey="1.3">Something else here</NavDropdown.Item>
                        </NavDropdown>
                        {currentUser !== undefined && currentUser.username === 'Guest' 
                        ? <Nav.Link onClick={()=>setModalShow(true)}><i class="fas fa-user"></i>  My Account</Nav.Link>
                        :<NavDropdown title={<span><i class="fas fa-user"></i>  Hello {currentUser.username}</span>} id="acc-dropdown" show={showAcc} onMouseEnter={showDropdown} onMouseLeave={(e)=>setAcc(false)}>
                            <NavDropdown.Item href="/profile" eventKey="2.1">My Profile</NavDropdown.Item>
                            {!currentUser.isAdmin 
                            ? <NavDropdown.Item eventKey="2.2">My Bookings</NavDropdown.Item>
                            : <NavDropdown.Item href='/admin/flight/show' eventKey="2.2">Manage Flights</NavDropdown.Item>
                            }
                            <NavDropdown.Item eventKey="2.3" onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    }

                    </Nav>
                </Container>
            </Navbar>
            <AccountModal show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}