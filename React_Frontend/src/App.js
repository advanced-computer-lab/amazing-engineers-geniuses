import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlightForm from './Components/CreateFlightForm';
import ShowFlights from './Components/ShowFlights'
import FlightSchedule from './Components/FlightSchedule';
import UpdateFlight from './Components/UpdateFlight'


class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
        {/* <Route exact path='/' component={ViewUsers} /> */}
        <Route path='/admin/flight/create' component={CreateFlightForm} />
        <Route path='/admin/flight/show' component={ShowFlights} />
        <Route path='/flightSchedule' component={FlightSchedule} />
        {/* <Route path='/admin/flight/update' component={UpdateFlight}/> */}
        <Route path='/admin/flight/update/:id' component={UpdateFlight}/>

    
        </div>
      </Router>
    );
  }
}

export default App;