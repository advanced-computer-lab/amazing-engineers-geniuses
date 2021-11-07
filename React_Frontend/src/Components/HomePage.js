import React from 'react'

export default function Homepage() {
    return (
        <div>
            <h1>Welcome to Amazing Air</h1>
            <a href = "/admin/flight/create"> Create Flight</a>
            <br/>
            <a href = "/admin/flight/show">Show Flights</a>
            <br/>
            <a href = "/flightSchedule">Flight Schedule</a>
        </div>
    )
}
