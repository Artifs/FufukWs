import React, { Component } from 'react'
import CarouselBox from '../components/CarouselBox'
import  { Breakpoint } from 'react-socks';
import Carousel from 'react-bootstrap/Carousel';
import sl1 from '../assets/sl1.png'
import sl2 from '../assets/sl2.png'
import sl3 from '../assets/sl3.png'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                
                <Breakpoint customQuery="(min-width: 769px)">
                    <div>
                    <CarouselBox className='CarouselBoxStyle' /></div>
                </Breakpoint>
                <Breakpoint customQuery="(max-width: 768px)">
                
                    <Carousel className='CarouselMobile'>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = " w-100"
                        src = { sl1 }
                    />
                    <Carousel.Caption>
                        <h3>Уникальность</h3>
                        <p>Неповторимый подарок для близких</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = " w-100"
                        src = { sl2 }
                    />
                    <Carousel.Caption>
                        <h3>Долговечность</h3>
                        <p>Подарок из древесины вечен</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = " w-100"
                        src = { sl3 }
                    />
                    <Carousel.Caption>
                        <h3>Универсальность</h3>
                        <p>Портрет можно подарить на любой праздник</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
                </Breakpoint>

                
                
                <p className = "text-center textHome">Дерево - это стильно!</p>
            </div>
        )
    }
}
