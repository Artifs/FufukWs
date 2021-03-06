import { Wallpaper } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { Container,Row,Col,Card,Nav,Tab } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { IoLogoVk,IoLogoInstagram } from "react-icons/io";
import CatalogSample from '../assets/CatalogSample.png'

export default function Uhod(props) {


    const repostVkApi = (e) =>{
        window.open('https://vk.com/share.php?url=http://u124078.test-handyhost.ru/&title=FUFUK WS - магазин древесных изделий&image=http://u124078.test-handyhost.ru/static/media/fufuk%20logo.b0145ca9.png')
    }
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
                            <Nav.Link eventKey="third" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}> <span className='textNav'>Тех. поддержка</span></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="four" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}> <span className='textNav'>Благодарность</span></Nav.Link>
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
                            В среднем неделю-две, всё зависит от почты России, мы можем за дополнительную плату оправлять через CDEK и тогда заказ придёт намного быстрее, об оказании данной услуги, вы можете написать нам в "Дополнительном примечании" при оформлении заказа           
                            <br/><br/><span className='numb'>Наши материалы</span><br/>
                            Фанера - это изделие из дерева, которое изготавливаются по технологии дерева по радиусу на мелкие слои и склеивания этих слоев друг с другом при помощи смолы. Такой тип фанеры называется ФК(фанера клееная). Мы используем данный тип фанеры! Это считается один из самых лучших материалов, благодаря своей прочности и большей влагостойкости от других видов материалов. К тому же это один из самых качественных и бюджетных видов фанеры! Это позволяет создать качественное, красивое и недорогое изделие! Фанера подразделяется на четыре сорта, которые идут от большего к меньшему с увеличения, на уменьшение сучков. Наши изделия изготавливаются из первого и второго сорта фанеры, что в итоге даёт меньше брака, тем самым наши изделия становятся более естественнее, более красивее и более качественнее.
                            <br/><br/><span className='numb'>Как выбрать фото для портрета? </span><br/>
                            Если вы уже долго выбираете фотографию для портрета, вы можете обратиться к нам в социальных сетях и мы поможем сделать вам выбор, который будет лучше смотреться на фанере, перед тем, как писать нам, проследуйте следующим советам: <br/>  1. Выбрать несколько понравившихся вам фотографии и расставить их по приоритетности. Сделайте это для того, что бы мы учли ваш выбор и сами смогли выбрать лучшую фотографию для визуальности портрета.
                            <br/>2. Лучший выбор фотографии, это профессионально сделанная фотография.
                            <br/>3. Посмотрите качество фотографии, формат фотографии, размер изображения и его вес. Чем больше размер и качество фотографии, тем больше размер портрета можно сделать. <br/>
                            Также, если вы хотите, чтобы мы как-то отредактировали вашу фотографию, например убрали лишних людей на фоне, либо удалили мешающие элементы, то при оформлении заказа, вы можете написать все свои пожелания в "Дополнительных примечаниях".
                            
                            <br/><br/><span className='numb'>Зачем нам ваша информация в профиле? </span><br/>
                            Наш сайт сделан максимально удобно в первую очередь для покупателя, если вы часто заказываете товары с нашего магазина, то вы можете в своем профиле задать ваши данные по умолчанию и на эти данные будет отправлен ваш заказ, вы можете и не вписывать в личном кабинете никаких данных, но тогда вам придется заново их вписывать при каждом заказе.
                            </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third"><div className='CardBody'>
                            <span className='numb'>Правила технической поддержки</span><br/>
                            В техническую поддержку можно обращаться по всем поводам, вы можете уточнить интересующие вас вопросы, сообщить о уязвимости, найденной вами, спросить совета по уходу за нашими изделиями.
                            <br/><br/><span className='numb'>Как проходит общение с тех. поддержкой</span><br/>
                            Вы на сайте указываете свою почту и пишите интересующий вас вопрос, далее мы отвечаем вам на почту, где и будет проходить дальнейший диалог.
                            </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="four"><div className='CardBody'><br/>
                            <span className='numb'>Если вам понравились наши товары, лучший ваш метод благодарности - распространение нас в социальных сетях.</span><br/>
                            Вы можете это сделать следующими методами: <br/>
                            Репост в ВКонтакте. <IoLogoVk variant="success" cursor = "pointer" className='FootIcon' onClick={repostVkApi}  /> 
                            <br/>Или перейти по этой рекламе и купите товар.<br/>
                            <LinkContainer to={`/Catalog`}>
                                 <Nav.Link >
                                        <Card >
                                            <Card.Img src={CatalogSample} />
                                        </Card> 
                                </Nav.Link>
                            </LinkContainer>
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

