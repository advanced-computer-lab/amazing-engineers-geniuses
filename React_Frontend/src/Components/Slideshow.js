import React from 'react';
import {Carousel} from 'react-bootstrap';
import "../Styles/Slideshow.css";
import SearchFlight from './SearchFlight';

export default function Slideshow(){
    return(
        <Carousel fade interval={5000}>
            <Carousel.Item>
                <Carousel.Caption>
                <h1 className='title'>Welcome to Amazing Air</h1>
                <div>
                    <SearchFlight/>
                </div>
                </Carousel.Caption>
                <div className='pickgradient'>
                    <img
                    className="d-block w-100"
                    src="/stock1.jpg"
                    alt="First slide"
                    />
                </div>
                
            </Carousel.Item>
            <Carousel.Item>
                <Carousel.Caption>
                <h1 className='title'>Welcome to Amazing Air</h1>

                <div>
                    <SearchFlight/>
                </div>
                </Carousel.Caption>
                <div className='pickgradient'>
                    <img
                    className="d-block w-100"
                    src="/stock2.jpg"
                    alt="Second slide"
                    />
                </div>
            </Carousel.Item>
               
            
        </Carousel>
    )
}