import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Switch } from 'react-router';
import FlightSchedule from './Components/FlightSchedule';
import Homepage from './Components/HomePage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminRoutes from './Components/AdminRoutes';
import MyBookings from './Components/MyBookings';
import Auth from './services/Auth';
import NavBar from './Components/NavBar.js';
import AvailableFlights from './Components/AvailableFlights';
import AvailableReturnFlights from './Components/AvailableReturnFlights';
import BookingItem from './Components/BookingItem';
import ChooseSeats from './Components/ChooseSeats';
import CreateBooking from './Components/CreateBooking';
import NewBooking from './Components/NewBooking';
import Profile from './Components/Profile';
import EditInfo from './Components/EditInfo';
import EditBooking from './Components/EditBooking';
import SearchFlight from './Components/SearchFlight'
import EditDepartureFlight from './Components/EditDepartureFlight'
import EditReturnFlight from './Components/EditReturnFlight'
import ChangeFlight from './Components/ChangeFlight'
import NamesModal from './Components/NamesModal';
import UserInfo from './Components/UserInfo'
import Pay from './Components/Pay'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {},
    }
  }

  componentDidMount(){
    this.setState({
      currentUser: Auth.getCurrentUser()
    })
  }

  render() {
    return (
      <Router>
          <NavBar expand='sm'/>
          <Route exact path='/' component={Homepage} />
          <Route path='/namesModal' component={NamesModal}/>
          <Route path='/flightSchedule' component={FlightSchedule} />
          <Route path='/viewMyBookings' component={MyBookings} />
          <Route path='/NewBooking' component={NewBooking} />
          {this.state.currentUser.isAdmin && <AdminRoutes/>}
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/availableFlights' component={AvailableFlights}/>
          <Route path='/availableReturnFlights' component={AvailableReturnFlights}/>
          {/* <Route path='/bookingConfirmation' component={BookingConfirmationModal}/> */}
          <Route path='/chooseSeats' component={ChooseSeats}/>
          <Route path='/userInfo' component={UserInfo}/>
          <Route path='/pay' component={Pay}/>
          <Route path='/BookingItem' component={BookingItem}/>

          <Route path='/createBooking' component={CreateBooking}/>
          <Route path='/profile' component={Profile}/>
          {/* <Route path='/profile/edit' component={EditInfo}/> */}
          
          <Route path='/editBooking' component={EditBooking}/>
          <Route path='/searchFlights' component={SearchFlight}/>
          <Route path='/editDepartureFlight' component={EditDepartureFlight}/>
          <Route path='/editReturnFlight' component={EditReturnFlight}/>
          <Route path='/changeFlight' component={ChangeFlight}/>


      </Router>
    );
  }
}

export default App;