import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import Seats from './Seats';

const Router = require('react-router-dom');



const Link = Router.Link

class FlightItem extends Component{

    
    constructor(props){
        super(props);
        this.state ={
            showPop: false
        }
        this.df = this.df.bind(this);
    }

    df(){
        console.log(this.props.flight);
        this.props.deleteFlight(this.props.flight._id);
    }

    render(){
        let hidden = '';
        if(this.props.hideBtn){
            hidden = true
        };
        const updateLink = '/admin/flight/update/'+this.props.flight._id;
        const dep = new Date(this.props.flight.DepDate);
        const arr = new Date(this.props.flight.ArrDate);
        console.log("SeatList");
        console.log(this.props.flight.SeatsList);
        // console.log(date);
        return(
            <div>
                <li>
                <ul>
                    <li>FlightNumber: {this.props.flight.FlightNumber}</li>
                    <li>Departure: {this.props.flight.Departure.Hours}:{this.props.flight.Departure.Minutes} {this.props.flight.Departure.Period} | {dep.getDate()}-{dep.getMonth()+1}-{dep.getFullYear()}</li>
                    <li>Arrival: {this.props.flight.Arrival.Hours}:{this.props.flight.Arrival.Minutes} {this.props.flight.Arrival.Period} | {arr.getDate()}-{arr.getMonth()+1}-{arr.getFullYear()}</li>
                    <li>EconomySeat: {this.props.flight.EconomySeats} </li>
                    <li>BusinessSeats: {this.props.flight.BusinessSeats} </li>
                    <li>FirstClassSeats: {this.props.flight.FirstClassSeats} </li>
                    <li>FromAirport: {this.props.flight.FromAirport} </li>
                    <li>ToAirport: {this.props.flight.ToAirport} </li>
                    <li>Terminal: {this.props.flight.Terminal} </li>
                    </ul>
                    <Seats Seats={this.props.flight.SeatsList}/>
                    
                    <Link className='btn btn-success' hidden={hidden} to = {updateLink} >Update</Link>
                    <button className='btn btn-danger' hidden={hidden} onClick={()=>{this.setState({showPop: true})}}>Delete</button>
                    <Modal show={this.state.showPop} onHide={()=>{this.setState({showPop: false})}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this Flight?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>{this.setState({showPop: false})}}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={()=>{this.setState({showPop: false});this.df()}}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </li>
                <br/>
                
            </div>
            
        )
    }

}

export default FlightItem
