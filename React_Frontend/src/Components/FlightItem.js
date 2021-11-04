import React, {Component} from 'react';

class FlightItem extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const flight = this.props.flight;
        return(
            <div>
                <div id="deletemodal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-lg" role="content">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                    <div className="form-row">
                                        <span>Are you sure you want to delete?</span>
                                        <button type="button" className="btn btn-secondary btn-sm ml-auto" data-dismiss="modal">Cancel</button>
                                        <button className='btn btn-danger' onClick={()=>{this.props.deleteFlight(flight._id)}}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>    

                <li>
                <ul>
                    <li>FlightNumber: {flight.FlightNumber}</li>
                    <li>Departure: {flight.Departure.Hours}:{flight.Departure.Minutes} {flight.Departure.Period}</li>
                    <li>Arrival: {flight.Arrival.Hours}:{flight.Arrival.Minutes} {flight.Arrival.Period} </li>
                    <li>FlightDate: {flight.FlightDate} </li> 
                    <li>EconomySeat: {flight.EconomySeats} </li>
                    <li>BusinessSeats: {flight.BusinessSeats} </li>
                    <li>FirstclassNameSeats: {flight.FirstclassNameSeats} </li>
                    <li>FromAirport: {flight.FromAirport} </li>
                    <li>ToAirport: {flight.ToAirport} </li>
                    </ul>
                    <button className="btn btn-danger btn-sm ml-1">
                        <a data-toggle="modal" data-target="#deletemodal">Delete</a>
                    </button>
                    {/* <button className='btn btn-danger' onClick={()=>{this.props.deleteFlight(this.props.flight._id)}}>Delete</button> */}
                </li>
                <br/>
            </div>
            
        )
    }

}

export default FlightItem