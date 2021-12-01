import React,{ Component, useEffect,useState } from 'react';
import AvailableFlights from './AvailableFlights';
import AvailableReturnFlights from './AvailableReturnFlights';
import {Container, Row, Col} from 'react-bootstrap';
import ChooseSeats from './ChooseSeats';
import FlightSummary from './FlightSummary';

export default function CreateBooking(props){
    const [display,setDisplay] = useState('depF');

    const getNext = (daState)=>{
        if(daState === 'depF'){
            setDisplay('retF')
        }
        else if (daState === 'retF'){
            setDisplay('retF')
        }
        else if(daState === 'seats'){
            console.log('last step');
        }
    }


    return(
        <Container>
            <Row>
                <Col>
                    {display === 'depF' &&
                        <AvailableFlights />
                    }
                    {display === 'retF' &&
                        <AvailableReturnFlights />
                    }
                    {display === 'seats' &&
                        <ChooseSeats />
                    }
                </Col>
                <Col>
                    <FlightSummary />
                </Col>
            </Row>

         </Container>
    )

}   