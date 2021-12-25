import React, { Component } from 'react';
import { Button, Modal, Accordion, Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Auth from "../services/Auth";
import '../Styles/FlightItem.css';
import ChooseSeats from './ChooseSeats';


const Router = require('react-router-dom');
const Link = Router.Link

class FlightItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
      currentUser: Auth.getCurrentUser(),
      CabinClass: '',
      returnFlights: [],
      showBookingConfirmation: false,
      PassengersNumber: '',
      AdultPassengers:'',
      KidPassengers:'',
      departureFlight: '',
      //returnFlight:''
      bookingInfo: this.props.bookingInfo,
      newDep: {}
    }
    this.df = this.df.bind(this);
    this.bookDepFlight = this.bookDepFlight.bind(this);
    this.bookReturnFlight = this.bookReturnFlight.bind(this);
    this.editDepFlight = this.editDepFlight.bind(this);
    this.editRetFlight = this.editRetFlight.bind(this);
    this.getClass2 = this.getClass2.bind(this);

  }

  df() {
    console.log(this.props.flight);
    this.props.deleteFlight(this.props.flight._id);
  }
  
  bookDepFlight(){
    this.props.setDepF(this.props.flight, this.props.returnFlights);
  }
  
  editDepFlight(){
    //console.log(this.props.bookingInfo.DepartureFlight);
    //console.log(this.props.flight);
    this.props.setTempFlight(this.props.flight);
    this.props.setDisplay('chooseDepSeats');
  }    
  
  editRetFlight(){
    this.props.setTempFlight(this.props.flight);
    this.props.setDisplay('chooseRetSeats');
  }   

  //---------------------------------------------------
  bookReturnFlight() {
    this.props.setRetF(this.props.flight);
  }
  
  getClass2(CabinClass){
    if(CabinClass ==='E'){
        return 'Econ';
    }
    else if(CabinClass === 'F'){
        return 'First';
    }
    else if (CabinClass === 'B'){
        return 'Bus';
    }
    return 'Error in getClass()';
}

  render() {
    let hidden = '';
    if (this.props.hideBtn) {
      hidden = true
    };
    const updateLink = '/admin/flight/update/' + this.props.flight._id;
    const dep = new Date(this.props.flight.DepDate);
    const arr = new Date(this.props.flight.ArrDate);
    const arrTime = `${this.props.flight.Arrival.Hours}:${this.props.flight.Arrival.Minutes}`
    const depTime = `${this.props.flight.Departure.Hours}:${this.props.flight.Departure.Minutes}`
    const depPer = `${this.props.flight.Departure.Period}`;
    const arrPer = `${this.props.flight.Arrival.Period}`;
    let diff = arr.getDate() - dep.getDate();
    let daysDiff = '';
    if (diff < 0 && arr.getMonth() - dep.getMonth() == 1) {
      diff = 30 - dep.getDate() + arr.getDate()
      daysDiff = `( +${diff} )`;
    }
    else if (diff < 0 && (arr.getMonth() - dep.getMonth() > 1 || arr.getMonth() + 12 - dep.getMonth() > 1)) {
      if (arr.getMonth() - dep.getMonth() < 0)
        daysDiff = `( + ~${arr.getMonth() + 12 - dep.getMonth()} months)`;
      else
        daysDiff = `( + ~${arr.getMonth() - dep.getMonth()} months)`;
    }
    else if (diff !== 0) {
      diff = arr.getDate() - dep.getDate();
      daysDiff = `( +${diff} )`;
    }
    return (
      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Row>
                <Col xs="9">
                  <Row>
                    <Col>
                      <Row>
                        <span className="timeDisp">{depTime}</span>
                        {depPer}
                      </Row>
                      <Row>
                        <span className="portDisp">
                          {this.props.flight.FromAirport.toUpperCase()}
                        </span>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <span className="timeDisp">{arrTime}</span>
                        {arrPer} {daysDiff}
                      </Row>
                      <Row>
                        <span className="portDisp">
                          {this.props.flight.ToAirport.toUpperCase()}
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  {!hidden && (
                    <div>
                      <Link className="btn btn-success" to={updateLink}>
                        Update
                          </Link>
                      <div
                        className="btn btn-danger"
                        onClick={() => {
                          this.setState({ showPop: true });
                        }}
                      >
                        Delete
                          </div>
                    </div>
                  )}
                  
                  {this.props.showSelect  && !this.props.editDep && (
                    <div>
                      <div className="btn btn-primary" onClick={this.bookDepFlight}>
                        Book Departure Flight
                          </div>
                    </div>
                  )}
                  
                  {this.props.editDep && (
                    <div>
                      <div className="btn btn-primary" size='lg' style={{paddingRight: '20px',paddingLeft: '20px'}} onClick={this.editDepFlight}>
                          Change
                      </div>
                    </div>
                  )}

                  {this.props.showSelect2 && !this.props.editRet && (
                    <div>
                      <div
                        className="btn btn-primary"
                        // onClick={() => {
                        //   this.setState({ showBookingConfirmation: true });
                        // }}
                        onClick={this.bookReturnFlight}
                      >
                        Book Return Flight
                          </div>
                    </div>
                  )}
                  
                  {this.props.editRet && (
                    <div>
                    <div className="btn btn-primary" size='lg' style={{paddingRight: '20px',paddingLeft: '20px'}} onClick={this.editRetFlight}>
                        Change
                    </div>
                  </div>
                  )}

                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Flight Number: {this.props.flight.FlightNumber}</li>
                <li>
                  Departure: {this.props.flight.Departure.Hours}:
                        {this.props.flight.Departure.Minutes}{" "}
                  {this.props.flight.Departure.Period} | {dep.getDate()}-
                        {dep.getMonth() + 1}-{dep.getFullYear()}
                </li>
                <li>
                  Arrival: {this.props.flight.Arrival.Hours}:
                        {this.props.flight.Arrival.Minutes}{" "}
                  {this.props.flight.Arrival.Period} | {arr.getDate()}-
                        {arr.getMonth() + 1}-{arr.getFullYear()}
                </li>
                <li>Duration: {this.props.flight.Duration.split(':')[0]} hours {this.props.flight.Duration.split(':')[1] !== '0' && <span>and {this.props.flight.Duration.split(':')[1]} minutes</span>}</li>
                <li>Terminal: {this.props.flight.Terminal} </li>
                {(this.props.CabinClass === "E" || this.state.currentUser.isAdmin) &&
                  <div>
                    <li>Cabin Class: Economy </li>
                    <li>Seats: {this.props.flight.EconomySeats}</li>
                    <li> Baggage Allowance: {this.props.flight.BaggageAllowance.Econ} kg</li>
                    <li> Price: {this.props.flight.Price.Econ}$ </li>

                  </div>
                }
                {(this.props.CabinClass === "B" || this.state.currentUser.isAdmin) &&
                <div>
                   <li> Cabin Class: Business </li>
                   <li> Seats: {this.props.flight.BusinessSeats} </li>
                   <li>Baggage Allowance: {this.props.flight.BaggageAllowance.Bus} kg </li>
                   <li>Price: {this.props.flight.Price.Bus}$ </li>
                </div>
                }
                {(this.props.CabinClass === "F" || this.state.currentUser.isAdmin) &&
                    <div>
                     <li>Cabin Class: First Class</li>  
                      <li> Seats: {this.props.flight.FirstClassSeats} </li> 
                      <li>  Baggage Allowance: {this.props.flight.BaggageAllowance.First} kg </li>
                      <li>  Price: {this.props.flight.Price.First}$ </li> 
                      </div>
  
                }
                {this.props.editDep &&
                  <li> <b> Price Difference: {this.props.flight.Price[this.getClass2(this.props.CabinClass)] - this.props.bookingInfo.ReturnFlight.Price[this.getClass2(this.props.bookingInfo.RetCabinClass)]}$</b></li>
                }
                
                {this.props.editRet &&
                  <li> <b> Price Difference: {this.props.flight.Price[this.getClass2(this.props.CabinClass)] - this.props.bookingInfo.ReturnFlight.Price[this.getClass2(this.props.bookingInfo.RetCabinClass)]}$</b></li>
                }
               
              </ul>
              {/* <Seats Seats={this.props.flight.SeatsList}/> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Modal
          show={this.state.showPop}
          onHide={() => {
            this.setState({ showPop: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Flight?
              </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ showPop: false });
              }}
            >
              Close
                </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.setState({ showPop: false });
                this.df();
              }}
            >
              Confirm
                </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}

//export default FlightItem
export default withRouter(FlightItem);

