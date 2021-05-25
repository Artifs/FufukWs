import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import sl1 from '../assets/sl11.jpg'
import sl2 from '../assets/sl22.jpg'
import sl3 from '../assets/sl33.jpg'



export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel d-block w-100"
                        height = "800"
                        src = { sl1 }
                    />
                    <Carousel.Caption>
                        <h3>Уникальность</h3>
                        <p>Неповторимый подарок для близких</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel d-block w-100"
                        height = "800"
                        src = { sl2 }
                    />
                    <Carousel.Caption>
                        <h3>Долговечность</h3>
                        <p>Подарок из древесины вечен</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel d-block w-100"
                        height = "800"
                        src = { sl3 }
                    />
                    <Carousel.Caption>
                        <h3>Универсальность</h3>
                        <p>Портрет можно подарить на любой праздник</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}
