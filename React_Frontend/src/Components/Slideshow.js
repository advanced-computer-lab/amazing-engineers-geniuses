import React from 'react';
import {Carousel} from 'react-bootstrap';
import "../Styles/Slideshow.css";

export default function Slideshow(){
    return(
        <Carousel fade>
            <Carousel.Item>
                <Carousel.Caption>
                <h3>Fly on Top-Tier Planes</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
                <img
                className="d-block w-100"
                src="/stock1.jpg"
                alt="First slide"
                />
                
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="/stock2.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}