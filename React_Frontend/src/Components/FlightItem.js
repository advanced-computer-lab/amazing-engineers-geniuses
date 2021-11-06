import React, {Component} from 'react';
import { useHistory } from "react-router-dom";
const Router = require('react-router-dom');
// import axios from 'axios';
// const api = 'http://localhost:8000';

const Link = Router.Link

class FlightItem extends Component{

    
    constructor(props){
        super(props);
        this.df = this.df.bind(this);
    }

    df(){
        this.props.deleteFlight(this.props.flight._id);
    }


    render(){

        console.log(this.props.hideBtn);
        let hidden = '';
        if(this.props.hideBtn){
            hidden = 'true'
        }
        console.log(hidden);
        const flight = this.props.flight;
        const updateLink = '/admin/flight/update/'+this.props.flight._id;

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
                                        <button className='btn btn-danger' data-dismiss="modal" onClick={this.df}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>    

                <li>
                <ul>
                    <li>FlightNumber: {this.props.flight.FlightNumber}</li>
                    <li>Departure: {this.props.flight.Departure.Hours}:{this.props.flight.Departure.Minutes} {this.props.flight.Departure.Period}</li>
                    <li>Arrival: {this.props.flight.Arrival.Hours}:{this.props.flight.Arrival.Minutes} {this.props.flight.Arrival.Period} </li>
                    <li>FlightDate: {this.props.flight.FlightDate} </li> 
                    <li>EconomySeat: {this.props.flight.EconomySeats} </li>
                    <li>BusinessSeats: {this.props.flight.BusinessSeats} </li>
                    <li>FirstClassSeats: {this.props.flight.FirstClassSeats} </li>
                    <li>FromAirport: {this.props.flight.FromAirport} </li>
                    <li>ToAirport: {this.props.flight.ToAirport} </li>
                    </ul>
                    <button className="btn btn-danger btn-sm ml-1" hidden={hidden}>
                        <a data-toggle="modal" data-target="#deletemodal">Delete</a>
                    </button>

                    <button type='update' className='btn btn-outline-primary' onClick={()=>{this.history.push("/admin/flight/update")}}>Update</button>
                    <Link to = {updateLink} >Update</Link>
                    {/* <button className='btn btn-danger' onClick={this.df}>Delete</button> */}

                </li>
                <br/>
            </div>
            
        )
    }

}

export default FlightItem
