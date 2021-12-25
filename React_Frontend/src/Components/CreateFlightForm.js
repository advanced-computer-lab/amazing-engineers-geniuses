import React, { Component } from "react";
import axios from "axios";
import { Alert,Container,Row,Col,Form,Button } from "react-bootstrap";
const api = "http://localhost:8000";

class CreateFlightForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlightNumber: "",
      Departure: "",
      Arrival: "",
      DepDate: "",
      ArrDate: "",
      EconomySeat: "",
      BusinessSeats: "",
      FirstClassSeats: "",
      FromAirport: "",
      ToAirport: "",
      EconPrice: "",
      FirstPrice: "",
      BusPrice: "",
      EconBag:"",
      BusBag:"",
      FirstBag:"",
      displayFlash: false,
      errMsg: "Error",
    };
    this.changeText = this.changeText.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  changeText(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  closeError(e) {
    this.setState({
      displayFlash: false,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const newFlight = this.state;
    axios
      .post(`${api}/admin/flight/create`, newFlight)
      .then((res) => {
        console.log("Flight Created:");
        console.log(newFlight);
        this.setState({
          FlightNumber: "",
          Departure: "",
          Arrival: "",
          FlightDate: "",
          EconomySeat: "",
          BusinessSeats: "",
          FirstClassSeats: "",
          FromAirport: "",
          ToAirport: "",
          EconPrice: "",
          FirstPrice: "",
          BusPrice: "",
          EconBag:"",
          BusBag:"",
          FirstBag:""
        });
        this.props.history.push("/admin/flight/show");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        this.setState({
          errMsg: err.response.data.message,
          displayFlash: true,
        });
      });
  }

  render() {
    let today = new Date();
    // console.log(today);
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const min = today.getMinutes();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    let timeToday = hh + ":" + min;

    return (
      <div>
        {this.state.displayFlash && (
          <Alert variant="warning" onClose={this.closeError} dismissible>
            {this.state.errMsg}
          </Alert>
        )}
        {/* <form onSubmit={this.submitForm}>
          <h1>Create Flight</h1>
          <label>Flight Number</label>
          <input
            type="number"
            placeholder="FlightNumber"
            name="FlightNumber"
            min="1"
            required
            onChange={this.changeText}
          />
          <br />
          <label>Departure</label>
          <input
            type="date"
            name="DepDate"
            min={today}
            required
            onChange={this.changeText}
          />
          <input
            type="time"
            name="Departure"
            required
            onChange={this.changeText}
          />
          <br />
          <label>Arrival</label>
          <input
            type="date"
            name="ArrDate"
            min={this.state.DepDate}
            required
            onChange={this.changeText}
          />
          <input
            type="time"
            name="Arrival"
            required
            onChange={this.changeText}
          />
          <br />
          <label>Economy Seats</label>
          <input
            type="number"
            placeholder="EconomySeats"
            name="EconomySeats"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Price"
            name="EconPrice"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Baggage"
            name="EconBag"
            min="0"
            required
            onChange={this.changeText}
          />
          <br />
          <label>Business Seats </label>
          <input
            type="number"
            placeholder="BusinessSeats"
            name="BusinessSeats"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Price"
            name="BusPrice"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Baggage"
            name="BusBag"
            min="0"
            required
            onChange={this.changeText}
          />
          <br />
          <label>First Class Seats</label>
          <input
            type="number"
            placeholder="FirstClassSeats"
            name="FirstClassSeats"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Price"
            name="FirstPrice"
            min="0"
            required
            onChange={this.changeText}
          />
          <input
            type="number"
            placeholder="Baggage"
            name="FirstBag"
            min="0"
            required
            onChange={this.changeText}
          />
          <br />
          <label>From Airport </label>
          <input
            type="text"
            placeholder="FromAirport"
            name="FromAirport"
            required
            onChange={this.changeText}
          />
          <br />
          <label>To Airport </label>
          <input
            type="text"
            placeholder="ToAirport"
            name="ToAirport"
            required
            onChange={this.changeText}
          />
          <br />
          <label>Terminal</label>
          <input
            type="text"
            placeholder="Terminal"
            name="Terminal"
            min="1"
            required
            onChange={this.changeText}
          />
          <br />
          <button type="submit">Create</button>
        </form> */}


         <Container>
                <h1>Create Flight</h1>
                <Form onSubmit={this.submitForm} id='createFlight'>
                    <Form.Group className="mb-3" controlId="FlightNo">
                       <Row>
                            <Col>
                                <Form.Label>Flight No.</Form.Label>
                                <Form.Control required name="FlightNumber" min='1' type="number"  placeholder="Enter flight #" min={0} onChange={this.changeText}/>
                            </Col>
                            <Col>
                                <Form.Label>Terminal</Form.Label>
                                <Form.Control name="Terminal" required min="1" type="number"  placeholder="Enter Terminal #" onChange={this.changeText}/>
                            </Col>
                       </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Departure">
                        <Form.Label>Departure</Form.Label>
                        <Row>
                            <Col><Form.Control name="Departure" required  type="time"  onChange={this.changeText}/></Col>
                            <Col><Form.Control name="DepDate" min={today} required type="date"  onChange={this.changeText}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Arrival">
                        <Form.Label>Arrival</Form.Label>
                        <Row>
                            <Col><Form.Control name="Arrival" required type="time"  onChange={this.changeText}/></Col>
                            <Col><Form.Control name="ArrDate" min={this.state.DepDate} required type="date"  onChange={this.changeText}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Number of Seats</Form.Label>
                        <Row>
                            <Col><Form.Control name="EconomySeats" min="0" required type="number"  placeholder="Economy Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control name="BusinessSeats" min="0" required type="number"  placeholder="Business Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control name="FirstClassSeats" min="0" required type="number"  placeholder="First Class" min={0} onChange={this.changeText}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Price</Form.Label>
                        <Row>
                            <Col><Form.Control name="EconPrice" min="0" required type="number"  placeholder="Economy Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control name="BusPrice" min="0" required type="number"  placeholder="Business Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control  name="FirstPrice" min="0" required type="number"  placeholder="First Class" min={0} onChange={this.changeText}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="SeatsNo">
                        <Form.Label>Baggage Allowance /Kg </Form.Label>
                        <Row>
                            <Col><Form.Control name="EconBag" min="0" required type="number"  placeholder="Economy Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control name="BusBag" min="0" required type="number"  placeholder="Business Class" min={0} onChange={this.changeText}/></Col>
                            <Col><Form.Control name="FirstBag" min="0" required type="number"  placeholder="First Class" min={0} onChange={this.changeText}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Airports">
                        <Row>
                            <Col>
                                <Form.Label>From</Form.Label>
                                <Form.Control name="FromAirport" required type="text"  placeholder="Enter Deprature Airport" onChange={this.changeText}/>
                            </Col>
                            <Col>
                                <Form.Label>To</Form.Label>
                                <Form.Control name="ToAirport" required type="text"  placeholder="Enter Arrival Airport" onChange={this.changeText}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button variant="warning" type='submit' form='createFlight'>
                        Create
                    </Button>
                </Form>
            </Container>
      </div>
    );
  }
}

export default CreateFlightForm;
