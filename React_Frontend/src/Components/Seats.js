import React,{useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import '../Styles/Seats.css';

export default function Seats(props){
    const [chosenSeats,setChosen] = useState([]);

    const confirmSeats = () =>{
        //remove seats from available seats
        //update flight
    }

    const chooseSeat = (e,seat,available)=>{
        if(available){
            let index = chosenSeats.indexOf(seat);
            //if seat wasn't chosen before
            if(index === -1){
                e.currentTarget.style.color = 'lightblue'
                setChosen([...chosenSeats,seat]);
            }
            else{
                e.currentTarget.style.color = 'lightgrey'
                let newSeats = chosenSeats.filter(s => s !== seat);
                setChosen(newSeats);
            }
        }
    }    

    const econSeats1 = props.Seats.Econ.map((seat,index)=>{
        if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'37px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>   
            <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const econSeats2 = props.Seats.Econ.map((seat,index)=>{
        if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'37px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const busSeats1 = props.Seats.Bus.map((seat,index)=>{
       if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const busSeats2 = props.Seats.Bus.map((seat,index)=>{
       if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const firstSeats1 = props.Seats.First.map((seat,index)=>{
         if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const firstSeats2 = props.Seats.First.map((seat,index)=>{
         if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i class="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    return(
        <div>
            <div>
                <Container>
                    <h2>Economy Class Seats</h2>
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{econSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{econSeats2}</Row></Col>
                    </Row>
                </Container>
            </div>
            <div>
                <Container>
                    <h2>Business Class Seats</h2>
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{busSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{busSeats2}</Row></Col>
                    </Row>
                </Container>
            </div>
            <div>
               <Container>
                    <h2>First Class Seats</h2>
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{firstSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{firstSeats2}</Row></Col>
                    </Row>
                </Container>
            </div>
            <button onClick={confirmSeats}>Confirm Seats</button>
        </div>
    )
}