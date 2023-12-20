import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from '../../assets/imgs/img1.jpg';
import img2 from '../../assets/imgs/img2.jpg';
import img3 from '../../assets/imgs/img3.jpg';
import './carousels.css'
function BookCarousels() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src={img1} alt="" className="w-100" />
                <Carousel.Caption>
                    <h3>Read Book, Increase Knowledge</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={img2} alt="" className="w-100" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={img3} alt="" className="w-100" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default BookCarousels;