import React, { Component } from 'react'
import { Container,Row,Col,Tab,Nav  } from 'react-bootstrap';
import { IoLogoVk,IoLogoInstagram } from "react-icons/io";

export default class Uhod extends Component {
    render() {
        return (
            <div className = 'MarginTop'>
               <Container>
                <Row>
                    
                    <Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column mb-5 navLinks">
                            <Nav.Item>
                            <Nav.Link eventKey="first" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}><span className='textNav'>Уход</span></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}> <span className='textNav'>Общие вопросы</span></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="third" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}> <span className='textNav'>О нас</span></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content className='mb-5'>
                            <Tab.Pane eventKey="first"><div className='CardBody'><span className='numb'>Общие правила ухода на за нашими товарами</span><br/>
                            <span className='numb'>1.</span> Водой не моем, чистим мягкой щеткой или используем пипидастр<br/><span className='numb'>2.</span> Никакой наждачной бумаги на выжженной поверхности<br/><span className='numb'>3.</span> Огонь противник любого дерева, портрет не исключение!<br/>
                            </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second"><div className='CardBody'>
                            <span className='numb'>Сколько доставка идёт?</span><br/>
                            В среднем неделю-две, всё зависит от почты России, мы можем за дополнительную плату оправлять через CDEK и тогда заказ придёт намного быстрее           
                            <br/><br/><span className='numb'>Наши материалы</span><br/>
                            Фанера - это изделие из дерева, которое изготавливаются по технологии дерева по радиусу на мелкие слои и склеивания этих слоев друг с другом при помощи смолы. Такой тип фанеры называется ФК(фанера клееная). Мы используем данный тип фанеры! Это считается один из самых лучших материалов, благодаря своей прочности и большей влагостойкости от других видов материалов. К тому же это один из самых качественных и бюджетных видов фанеры! Это позволяет создать качественное, красивое и недорогое изделие! Фанера подразделяется на четыре сорта, которые идут от большего к меньшему с увеличения, на уменьшение сучков. Наши изделия изготавливаются из первого и второго сорта фанеры, что в итоге даёт меньше брака, тем самым наши изделия становятся более естественнее, более красивее и более качественнее.
                            <br/><br/><span className='numb'>Как выбрать фото для портрета? </span><br/>
                            1. Выбрать несколько понравившихся вам фотографии и расставить их по приоритетности. Сделайте это для того, что бы мы учли ваш выбор и сами смогли выбрать лучшую фотографию для визуальности портрета.
                            <br/>2. Лучший выбор фотографии, это профессионально сделанная фотография.
                            <br/>3. Посмотрите качество фотографии, формат фотографии, размер изображения и его вес. Чем больше размер и качество фотографии, тем больше размер портрета можно сделать.
                            </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third"><div className='CardBody'>
                            <span className='numb'>Кто мы?</span><br/>
                            Владельцы выжигательного станка, базируемся в Ярославской области.
                            <br/><br/><span className='numb'>Наши соц. сети, которые мы используем как портфолио</span><br/>
                            <a href="https://vk.link/fufuk"><IoLogoVk  cursor = "pointer" className='FootIcon footicon2'  /> </a> &nbsp;
                            <a href= "https://www.instagram.com/fufuk_workshop/"><IoLogoInstagram cursor = "pointer" className='FootIcon footicon2' /></a> 
                            </div>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                    </Col>
                    
                </Row>
                </Container>
            </div>
        )
    }
}
