import React from 'react';
import { Route } from 'react-router-dom';
import CreateFlightForm from './CreateFlightForm';
import ShowFlights from './ShowFlights';
import UpdateFlight from './UpdateFlight';

export default function AdminRoutes(props){
    return( 
        [
        <Route key='1' path='/admin/flight/create' component={CreateFlightForm} />
        ,<Route key='2' path='/admin/flight/show' component={ShowFlights} />
        ,<Route key='3' path='/admin/flight/update/:id' component={UpdateFlight}/>
    ]
    )
}