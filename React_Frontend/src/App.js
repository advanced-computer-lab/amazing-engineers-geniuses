import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlightForm from './Components/CreateFlightForm';
import ShowFlights from './Components/ShowFlights';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        {/* <Route exact path='/' component={ViewUsers} /> */}
        <Route path='/admin/flight/create' component={CreateFlightForm} />
        <Route path='/admin/flight/show' component={ShowFlights} />
        
    
        </div>
      </Router>
    );
  }
}

export default App;