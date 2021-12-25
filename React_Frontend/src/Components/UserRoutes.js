
import React from 'react';
import { Route } from 'react-router-dom';
import AvailableFlights from './AvailableFlights';
import ShowFlights from './ShowFlights';
import Profile from './Profile';
import MyBookings from './MyBookings';
import EditBooking from './EditBooking';
import AvailableReturnFlights from './AvailableReturnFlights';
import ChooseSeats from './ChooseSeats';
import UserInfo from './UserInfo';
import Pay from './Pay';
import BookingItem from './BookingItem';

export default function UserRoutes(props){
    return( 
        [
        <Route key='1' path='/profile' component={Profile}/>,
            <Route key='2' path='/viewMyBookings' component={MyBookings} />,
            <Route key='3' path='/editBooking' component={EditBooking}/>,
            <Route path='/availableFlights' component={AvailableFlights}/>,
          <Route path='/availableReturnFlights' component={AvailableReturnFlights}/> ,
          <Route path='/chooseSeats' component={ChooseSeats}/>,
          <Route path='/userInfo' component={UserInfo}/>,
          <Route path='/pay' component={Pay}/>,
          <Route path='/BookingItem' component={BookingItem}/> 
    ]
    )
}
