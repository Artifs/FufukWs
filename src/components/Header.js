import React, { Component } from 'react'
import { Container, Nav, Navbar, Button,OverlayTrigger,Popover } from 'react-bootstrap'
import logo from '../assets/fufuk logo.png'
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineMinus,AiOutlineShoppingCart } from "react-icons/ai";
import  { Breakpoint } from 'react-socks';
import { withRouter} from 'react-router-dom';
import { UserContext } from "../App";
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',
            clickedOutside: true,
            redirect: false,
            auth:true,
            err: '',
            loggedIn: false,
            sended:false,
            msgOnNav:'nul',
            expanded:false
            
        }
        this.isDisabled = this.isDisabled.bind(this);
  
    }
 componentWillUnmount() {
  document.removeEventListener('click', this.handleClickOutside, false);
}

componentWillMount() {
  document.addEventListener('click', this.handleClickOutside, false);
}

handleClickOutside = (e)  => {
  const persButt = document.getElementById('popover-basic');
  if (!e.path.includes(persButt)) {
    const svgSmileBtn = document.getElementById('personButton');
    if (!e.path.includes(svgSmileBtn)) {
        this.setState({clickedOutside: true})
    }
  }
}

Auth = (e) => {
        const email = this.state.email;
        const password = this.state.password;
        const auth = this.state.auth;
        var form = new FormData()
        form.append('email', email);
        form.append('password', password);
        form.append('auth', auth);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response === 'err'){
                console.log(response)
                this.setState({err:'Email и пароль не совпадают'});
            }else if (response === 'Confirm'){
                console.log(response)
                this.setState({
                    err:'',
                    loggedIn:true,
                    clickedOutside: true
                });
               
                
                this.props.history.push ('/Account')
            }
            
        })
}

        hanleOnClick = (e) => {
            this.setState({redirect: true})
            this.setState({clickedOutside: !this.state.clickedOutside})
        }

        Flip = (e) => {
            this.setState({expanded:false})
             if(this.state.loggedIn){
                this.props.history.push ('/Account')
             }else{
                this.setState({clickedOutside: !this.state.clickedOutside})
             }
        }
        isDisabled = (e) => {
            if (this.state.clickedOutside === false){
                return true
            }else{
                return false
            }
        }
        // handleCartClick = (e) => {
        //     this.props.history.push ('/Cart')
        // }


    
    render() {
       const popover = (
            <Popover id="popover-basic">
            <Popover.Content>
                <label className="field field_v3 inpReg">
                <input type="email" className="field__input inpReg" placeholder="example@gmail.com"   onChange={(e) => {this.setState({email: e.target.value})}} />
                <span className="field__label-wrap inpReg">
                <span className="field__label inpReg">E-mail </span>
                </span>
                </label>
                <br/>
                <label className="field field_v3 inpReg">
                <input type = 'password' className="field__input inpReg" placeholder="********"   onChange={(e) => {this.setState({password: e.target.value})}} />
                <span className="field__label-wrap inpReg">
                <span className="field__label inpReg" >Пароль</span>
                </span>
                </label>
                <br/>
                <div className = 'errAlrt'>{this.state.err}</div>
                
                <div className='butLogIn mt-2'>
                <button type="submit" className='nextButtonZakaz' onClick = {this.Auth}>Войти</button>
                </div>
                <div className='orSpan mt-2'><AiOutlineMinus/>или<AiOutlineMinus/></div>
                <div className='butLogIn mt-2'>
                <Nav className = "mr-auto">
                <LinkContainer to = '/FastRegistration'>
                    <button className='nextButtonZakaz mb-2'>Быстрая регистрация</button>
                </LinkContainer>
                </Nav>
                </div>
            </Popover.Content>
            </Popover>
        );
 
        return (
            <>
                <UserContext.Consumer>
                    {(value) =>{
                        if(this.state.loggedIn === true && this.state.sended === false){
                            value.setUserState((p) => ({ ...p, isLoggedIn: true}))
                            value.setEmailState((e) => ({ ...e , email: this.state.email}))
                            this.setState({sended:true})
                        }
                        if(value.userState.isLoggedIn === true && this.state.loggedIn === false){
                            this.setState({
                                loggedIn:true
                            })
                        }

                        if( value.userState.isLoggedIn == false && this.state.loggedIn === true){
                            this.setState({
                                loggedIn:false,
                                sended:false,
                            }) 
                        } 
                    }}
                </UserContext.Consumer>
                <Navbar fixed='top' collapseOnSelect expand = "lg" bg="light" variant = "light" expanded = {this.state.expanded}>
                    <Container>
                        <Navbar.Brand className='fullLogo' style={{marginRight:'0px'}} onClick ={(e) => {this.props.history.push ('/')
                        this.setState({expanded:false})}}>
                            <img 
                            src = {logo}
                            height = "47"
                            width = "30"
                            className = "d-inline-block align-top"
                            alt = "Logo"
                            /> 
                        </Navbar.Brand>
                        <Breakpoint customQuery="(max-width: 991px)">
                            <OverlayTrigger  show={this.isDisabled()} trigger="click" placement="bottom" overlay={popover} className = 'AuthIcon' >
                                <BsPersonFill className='HeadIcon' id = 'personButton' variant="success" cursor = "pointer" onClick={this.Flip }/>
                            </OverlayTrigger>
                            <LinkContainer to='/Cart' onClick={() => {this.setState({expanded:false})}}>
                                <AiOutlineShoppingCart className='HeadIcon'  id = 'personButton' variant="success" cursor = "pointer" onClick={this.handleCartClick}/>
                            </LinkContainer>
                            </Breakpoint>         
                        <Navbar.Toggle aria-controls = "responsive-navbar-nav" color='dark' onClick={(e) => {this.setState({expanded: !this.state.expanded })}} />
                        <Navbar.Collapse  id="responsive-navbar-nav">
                            <Nav className = "ml-4 mr-auto allLinks" >
                            <Nav.Item>
                            <LinkContainer onClick={() => {this.setState({expanded:false})}}  to = '/Catalog' className='CatalNav' >
                                <Nav.Link><span className='ml-3 mr-3 allLinks'>Каталог</span></Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <LinkContainer onClick={() => {this.setState({expanded:false})}} to = '/ZakazPortreta'>
                                <Nav.Link><span className='ml-3 mr-3 allLinks'>Заказать портрет</span></Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <LinkContainer onClick={() => {this.setState({expanded:false})}} to = '/FAQ'>
                                <Nav.Link ><span className='ml-3 mr-3 allLinks' >FAQ</span></Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <LinkContainer onClick={() => {this.setState({expanded:false})}} to = '/TechicalSupport'>
                                <Nav.Link ><span className='ml-3 mr-3 allLinks' >Тех. поддержка</span></Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <LinkContainer onClick={() => {this.setState({expanded:false})}} to = '/Test'>
                                <Nav.Link ><span className='ml-3 mr-3 allLinks' >Тест</span></Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            </Nav>
                            <Breakpoint customQuery="(min-width: 992px)">
                                <OverlayTrigger  show={this.isDisabled()} trigger="click" placement="bottom" overlay={popover} className = 'AuthIcon' >
                                    <BsPersonFill className='HeadIcon' id = 'personButton' variant="success" cursor = "pointer" onClick={this.Flip}/>
                                </OverlayTrigger>
                            <LinkContainer to='/Cart'>
                                <AiOutlineShoppingCart className='HeadIcon'  id = 'personButton' variant="success" cursor = "pointer" onClick={this.handleCartClick}/>
                            </LinkContainer>
                            </Breakpoint>
                            </Navbar.Collapse>
                            </Container>
                </Navbar>

             
            </>
        );
        
    }
    
}




export default withRouter(Header);