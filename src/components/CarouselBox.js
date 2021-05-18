import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import sl1 from '../assets/sl1.png'
import sl2 from '../assets/sl2.png'
import sl3 from '../assets/sl3.png'



export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "d-block w-100"
                        height = "800"
                        src = { sl1 }
                        alt = "Уникальность"
                    />
                    <Carousel.Caption>
                        <h3>Уникальность</h3>
                        <p>Неповторимый подарок для близких</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "d-block w-100"
                        height = "800"
                        src = { sl2 }
                        alt = "Уникальность"
                    />
                    <Carousel.Caption>
                        <h3>Долговечность</h3>
                        <p>Подарок из древесины вечен</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "d-block w-100"
                        height = "800"
                        src = { sl3 }
                        alt = "Уникальность"
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
