import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import FlightSchedule from './Components/FlightSchedule';
import Homepage from './Components/HomePage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminRoute from './Components/AdminRoute';

const api = 'http://localhost:8000';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <AdminRoute/>
          <Route path='/flightSchedule' component={FlightSchedule} />
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </Router>
    );
  }
}

export default App;