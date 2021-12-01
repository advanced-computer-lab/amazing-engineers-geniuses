import React, { Component } from 'react';
import { Button, Modal, Accordion, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Auth from "../services/Auth";
import '../Styles/FlightItem.css';
import { useLocation } from "react-router-dom";


const Router = require('react-router-dom');
const api = 'http://localhost:8000';
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
      departureFlight: '',
      //returnFlight:''
    }
    this.df = this.df.bind(this);
    this.bookDepFlight = this.bookDepFlight.bind(this);
    this.bookReturnFlight = this.bookReturnFlight.bind(this);
  }

  df() {
    console.log(this.props.flight);
    this.props.deleteFlight(this.props.flight._id);
  }


  // bookDepFlight() {
  //   const bookedFlight = this.props.flight; //DEPARTURE FLIGHT
  //   const bookedId = this.props.flight._id;
  //   console.log("aaaaaaaa");
  //   const returnFlights = this.props.returnFlights;
  //   this.props.history.push({
  //     pathname: '/availableReturnFlights',
  //     state: { returnFlights: returnFlights, bookedFlight: bookedFlight, CabinClass: this.props.CabinClass }
  //   });
  // }
  
  bookDepFlight(){
    this.props.setDepF(this.props.flight, this.props.returnFlights);
  }
  
  //---------------------------------------------------
  bookReturnFlight() {
    // const returnFlight = this.props.flight; //RETURN FLIGHT
    // const depFlight = this.props.depFlight;
    // console.log(this.state.departureFlight);

    //  this.setState({
    //    returnFlight: this.props.fligh
    //  });

    // this.props.history.push({
    //   pathname: '/chooseSeats',
    //   state: { returnFlight: returnFlight, departureFlight: depFlight, CabinClass: this.props.CabinClass, PassengersNumber: this.props.PassengersNumber }
    // });

    this.props.setRetF(this.props.flight);
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
                  {this.props.showSelect && (
                    <div>
                      <div className="btn btn-primary" onClick={this.bookDepFlight}>
                        Book Departure Flight
                          </div>
                    </div>
                  )}

                  {this.props.showSelect2 && (
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

                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              {/* {this.state.currentUser.isAdmin && (
                    <ul>
                      <li>Flight Number: {this.props.flight.FlightNumber}</li>
                      <li>
                        Departure: {this.props.flight.Departure.Hours}:
                        {this.props.flight.Departure.Minutes}
                        {this.props.flight.Departure.Period} | {dep.getDate()}-
                        {dep.getMonth() + 1}-{dep.getFullYear()}
                      </li>
                      <li>
                        Arrival: {this.props.flight.Arrival.Hours}:
                        {this.props.flight.Arrival.Minutes}
                        {this.props.flight.Arrival.Period} | {arr.getDate()}-
                        {arr.getMonth() + 1}-{arr.getFullYear()}
                      </li>
                      <li>
                        Economy Class Seats: {this.props.flight.EconomySeats} |
                        Price: {this.props.flight.Price.Econ}$ | Baggage
                        Allowance: {this.props.flight.BaggageAllowance.Econ}kg
                      </li>
                      <li>
                        Business Class Seats: {this.props.flight.BusinessSeats} |
                        Price: {this.props.flight.Price.Bus}$ | Baggage
                        Allowance: {this.props.flight.BaggageAllowance.Bus}kg
                      </li>
                      <li>
                        First Class Seats: {this.props.flight.FirstClassSeats} |
                        Price: {this.props.flight.Price.First}$ | Baggage
                        Allowance: {this.props.flight.BaggageAllowance.First}kg
                      </li>
                      <li>Duration: {this.props.flight.Duration.split(':')[0]} hours {this.props.flight.Duration.split(':')[1] !== '0' && <span>and {this.props.flight.Duration.split(':')[1]} minutes</span>}</li>
                      <li>Terminal: {this.props.flight.Terminal} </li>
                    </ul>
                  )}
                  {!this.state.currentUser.isAdmin && ( */}
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
                {(this.props.CabinClass == "E" || this.state.currentUser.isAdmin) &&
                  <li>

                    Cabin Class: {"Economy"}
                          Seats: {this.props.flight.EconomySeats} |
                          Price: {this.props.flight.Price.Econ}$ |
                          Baggage Allowance: {this.props.flight.BaggageAllowance.Econ} kg
                        </li>
                }
                {(this.props.CabinClass == "B" || this.state.currentUser.isAdmin) &&
                  <li>

                    Cabin Class: {"Business"}
                          Seats: {this.props.flight.BusinessSeats} |
                          Price: {this.props.flight.Price.Bus}$ |
                          Baggage Allowance: {this.props.flight.BaggageAllowance.Bus} kg

                        </li>
                }
                {(this.props.CabinClass == "F" || this.state.currentUser.isAdmin) &&
                  <li>

                    Cabin Class: {"First Class"}
                          Seats: {this.props.flight.FirstClassSeats} |
                          Price: {this.props.flight.Price.First}$ |
                          Baggage Allowance: {this.props.flight.BaggageAllowance.First} kg

                        </li>
                }
                <li>Duration: {this.props.flight.Duration.split(':')[0]} hours {this.props.flight.Duration.split(':')[1] !== '0' && <span>and {this.props.flight.Duration.split(':')[1]} minutes</span>}</li>
                <li>Terminal: {this.props.flight.Terminal} </li>
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

