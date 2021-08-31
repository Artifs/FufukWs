import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import logo from '../assets/fufuk logo.png'
import { IoLogoVk,IoLogoInstagram } from "react-icons/io";
import { RiMastercardLine,RiVisaLine } from "react-icons/ri";
import { withRouter} from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <Container>
                <Row className='text-center mt-3' xs = {1} sm ={1} md = {3} lg={3} xl={3}>
                    <Col >
                    <img src ={logo} height = "70" width = "40" className = "d-inline-block mt-3" alt = "Logo" /> 
                    <a href="https://vk.link/fufuk"><IoLogoVk variant="success" cursor = "pointer" className='FootIcon '  /> </a> 
                    <a href= "https://www.instagram.com/fufuk_workshop/"><IoLogoInstagram variant="success" cursor = "pointer" className='FootIcon' /></a> 
                    </Col>
                    <Col className='mt-2 mb-2'>
                    <span className='TagInfo'>Email:</span> FufukWS@gmail.com<br/>
                    <span className='TagInfo'>Время работы тех. поддержки:</span> <br/>ПН-ПТ: 10:00-21:00
                    </Col>
                    <Col >
                    Принимаем к оплате:<br/>
                    <RiMastercardLine variant="success" cursor = "pointer" className='FootIcon '  /> 
                    <RiVisaLine variant="success" cursor = "pointer" className='FootIcon '  />
                    </Col>
                </Row>
                <Row className='text-center' xs = {1} sm ={1} md = {3} lg={3} xl={3} >
                    <Col >
                    © 2020, FufukWS.com
                    </Col>
                    <Col >
                    <a href='#' className='dot' >Публичная оферта</a>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}




export default withRouter(Footer);