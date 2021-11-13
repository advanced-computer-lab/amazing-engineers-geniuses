import React from 'react';
import { Route } from 'react-router-dom';
import CreateFlightForm from './CreateFlightForm';
import ShowFlights from './ShowFlights';
import UpdateFlight from './UpdateFlight';

export default function AdminRoute(props){
    return( 
        [
        <Route path='/admin/flight/create' component={CreateFlightForm} />
        ,<Route path='/admin/flight/show' component={ShowFlights} />
        ,<Route path='/admin/flight/update/:id' component={UpdateFlight}/>
    ]
    )
}