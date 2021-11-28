import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Switch } from 'react-router';
import FlightSchedule from './Components/FlightSchedule';
import Homepage from './Components/HomePage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminRoutes from './Components/AdminRoutes';
import Auth from './services/Auth';
import NavBar from './Components/NavBar.js';
import AvailableFlights from './Components/AvailableFlights';

const api = 'http://localhost:8000';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {}
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
          <NavBar/>
          <Route exact path='/' component={Homepage} />
          <Route path='/flightSchedule' component={FlightSchedule} />
          {this.state.currentUser.isAdmin && <AdminRoutes/>}
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/availableFlights' component={AvailableFlights}/>
      </Router>
    );
  }
}

export default App;