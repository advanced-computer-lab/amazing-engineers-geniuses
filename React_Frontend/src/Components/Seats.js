import React,{useState, useEffect} from 'react';
import {Container, Row, Col,Card} from 'react-bootstrap'
import '../Styles/Seats.css';

export default function Seats(props){
    const [chosenSeats,setChosen] = useState([]);
    const [msg, setMsg] = useState('Exceeded the number of passengers entered!');

    useEffect(() => {
       confirmSeats();
    }, [chosenSeats]);

    const showSeatsAlert = ()=>{
        props.showAlert(msg,true);
    }

    const confirmSeats = () =>{
        props.setSeats(chosenSeats);
    }

    const chooseSeat = (e,seat,available)=>{
        if(available){ // if seat was not chosen before by another user
            let index = chosenSeats.indexOf(seat);
            //if seat wasn't chosen before by me
            if(index === -1 && chosenSeats.length < props.PassengersNumber){
                e.currentTarget.style.color = 'lightblue'
                setChosen([...chosenSeats,seat]);
            }
            else{ //either deselecting a seat or no. of passengers exceeded
                if(chosenSeats.length >= props.PassengersNumber && index === -1){
                    showSeatsAlert();
                }
                else if(index !== -1){
                    e.currentTarget.style.color = 'lightgrey'
                    let newSeats = chosenSeats.filter(s => s !== seat);
                    setChosen(newSeats);
                }
            }
        }
    }  

    const econSeats1 = props.Seats.Econ.map((seat,index)=>{
        if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'37px'}}><button key={index*2} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>   
            <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const econSeats2 = props.Seats.Econ.map((seat,index)=>{
        if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'37px'}}><button key={index*2+1} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const busSeats1 = props.Seats.Bus.map((seat,index)=>{
       if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index*2} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const busSeats2 = props.Seats.Bus.map((seat,index)=>{
       if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index*2+1} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const firstSeats1 = props.Seats.First.map((seat,index)=>{
         if(index % 2 === 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index*2} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    const firstSeats2 = props.Seats.First.map((seat,index)=>{
         if(index % 2 !== 0){
            let available = props.Seats.Available.indexOf(seat) > -1 ? true : false;
            let color = available ? 'lightgrey' : 'Red';
            return (<Col style={{maxWidth:'50px'}}><button key={index*2+1} style={{color: color, border:'none'}} onClick={(e)=>chooseSeat(e,seat,available)}>
              <i className="fas fa-square fa-2x"></i></button></Col>)
        }
    })

    return(
        <div>
            {props.CabinClass === 'E' && <div>
                <Container>
                <Card style={{ maxWidth: '40rem'  ,margin: '15px'}}>
                 <Card.Body>
                    <Card.Title>Economy Class Seats</Card.Title>
                    <br/>                     
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{econSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{econSeats2}</Row></Col>
                    </Row>
                    </Card.Body>
                    </Card>
                </Container>
            </div>}
            {props.CabinClass === 'B' && <div>
                <Container>
                <Card style={{ maxWidth: '40rem' ,margin: '15px'}}>
                 <Card.Body>
                    <Card.Title>Business Class Seats</Card.Title>
                    <br/>
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{busSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{busSeats2}</Row></Col>
                    </Row>
                    </Card.Body>
                    </Card>
                </Container>
            </div>}
            {props.CabinClass === 'F' && <div>  
               <Container>
               <Card style={{ maxWidth: '40rem' ,margin: '15px'}}>
                 <Card.Body>
                    <Card.Title>First Class Seats</Card.Title>
                    <br/>
                    <Row style={{maxWidth: '350px'}}>
                        <Col xs="5"><Row>{firstSeats1}</Row></Col>
                        <Col style={{borderLeft:"thin solid grey", borderRight:"thin solid grey" }}></Col>
                        <Col style={{direction:'rtl'}} xs="5"><Row>{firstSeats2}</Row></Col>
                    </Row>
                    </Card.Body>
                    </Card>
                </Container>
            </div>}
            
        </div>
    )
}