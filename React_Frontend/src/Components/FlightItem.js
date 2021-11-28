import React, {Component} from 'react';
import {Button, Modal, Accordion, Row, Col} from 'react-bootstrap';
// import Seats from './Seats';
import '../Styles/FlightItem.css'

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
        const arrTime = `${this.props.flight.Arrival.Hours}:${this.props.flight.Arrival.Minutes}`
        const depTime = `${this.props.flight.Departure.Hours}:${this.props.flight.Departure.Minutes}`
        const depPer = `${this.props.flight.Departure.Period}`;
        const arrPer = `${this.props.flight.Arrival.Period}`;
        let diff = arr.getDate() - dep.getDate();
        let daysDiff = '';
        if(diff < 0 && arr.getMonth()-dep.getMonth() == 1){
            diff = 30-dep.getDate() + arr.getDate()
            daysDiff = `( +${diff} )`;
        }
        else if(diff < 0 && (arr.getMonth()-dep.getMonth() > 1 || arr.getMonth()+12 - dep.getMonth() > 1)){
            if(arr.getMonth()-dep.getMonth() < 0)
                daysDiff = `( + ~${arr.getMonth()+12 - dep.getMonth() } months)`;
            else
                daysDiff = `( + ~${arr.getMonth()-dep.getMonth()} months)`;
        }
        else{
            diff = arr.getDate()-dep.getDate();
            daysDiff = `( +${diff} )`;
        }


        
        // console.log("SeatList");
        // console.log(this.props.flight.SeatsList);
        // console.log(date);
        return(
            <div>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <Row>
                                    <Col xs='9'>
                                        <Row>
                                            <Col>
                                                <Row><span className='timeDisp'>{depTime}</span>{depPer}</Row>
                                                <Row><span className='portDisp'>{this.props.flight.FromAirport.toUpperCase()}</span></Row>
                                            </Col>
                                            <Col>
                                                <Row><span className='timeDisp'>{arrTime}</span>{arrPer} {daysDiff}</Row>
                                                <Row><span className='portDisp'>{this.props.flight.ToAirport.toUpperCase()}</span></Row>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col>
                                        {!hidden && 
                                        <div>
                                            <Link className='btn btn-success' to = {updateLink} >Update</Link>
                                            <div className='btn btn-danger' onClick={()=>{this.setState({showPop: true})}}>Delete</div>
                                        </div>}
                                        
                                    </Col>
                                </Row>
                                
                                
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>Flight Number: {this.props.flight.FlightNumber}</li>
                                    <li>Departure: {this.props.flight.Departure.Hours}:{this.props.flight.Departure.Minutes} {this.props.flight.Departure.Period} | {dep.getDate()}-{dep.getMonth()+1}-{dep.getFullYear()}</li>
                                    <li>Arrival: {this.props.flight.Arrival.Hours}:{this.props.flight.Arrival.Minutes} {this.props.flight.Arrival.Period} | {arr.getDate()}-{arr.getMonth()+1}-{arr.getFullYear()}</li>
                                    <li>Economy Class Seats: {this.props.flight.EconomySeats} </li>
                                    <li>Business Class Seats: {this.props.flight.BusinessSeats} </li>
                                    <li>First Class Seats: {this.props.flight.FirstClassSeats} </li>
                                    <li>Terminal: {this.props.flight.Terminal} </li>
                                </ul>  
                                {/* <Seats Seats={this.props.flight.SeatsList}/> */}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

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
                
            </div>
            
        )
    }

}

export default FlightItem
