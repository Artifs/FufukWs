import React, { Component } from 'react'
import CarouselBox from '../components/CarouselBox'
import  { Breakpoint } from 'react-socks';
import Carousel from 'react-bootstrap/Carousel';
import sl1 from '../assets/sl11.jpg'
import sl2 from '../assets/sl22.jpg'
import sl3 from '../assets/sl33.jpg'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Carousel className='CarouselMobile'>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel w-100"
                        src = { sl1 }
                    />
                    <Carousel.Caption >
                        <span className='tagCaption'>Уникальность</span><br/>
                        <span className='UndtagCaption'>Неповторимый подарок для близких</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel w-100"
                        src = { sl2 }
                    />
                    <Carousel.Caption >
                        <span className='tagCaption'>Долговечность</span><br/>
                        <span className='UndtagCaption'>Подарок из древесины вечен</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval = {2000}>
                    <img 
                        className = "ImgCarousel w-100"
                        src = { sl3 }
                    />
                    <Carousel.Caption >
                        <span className='tagCaption'>Универсальность</span><br/>
                        <span className='UndtagCaption'>Портрет можно подарить на любой праздник</span>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
                
                <div className='Slogan'>
                <p className = "text-center textHome">Дерево - это стильно!</p></div>
            </div>
        )
    }
}
