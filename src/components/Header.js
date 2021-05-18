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
        fetch("http://localhost/projects/server/index.php",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response === 'err'){
                this.setState({err:'Email и пароль не совпадают'});
            }else if (response === 'Confirm'){
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
        handleCartClick = (e) => {
            this.props.history.push ('/Cart')
        }


    
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
                <Button type="submit" variant="secondary" onClick = {this.Auth}>Войти</Button>
                </div>
                <div className='orSpan mt-2'><AiOutlineMinus/>или<AiOutlineMinus/></div>
                <div className='butLogIn mt-2'>
                <Nav className = "mr-auto">
                <LinkContainer to = '/FastRegistration'>
                    <Button variant="secondary" className = "mb-2" onClick = {this.hanleOnClick}>Быстрая регистрация</Button>
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
                <Navbar fixed='top' collapseOnSelect expand = "md" bg="dark" variant = "dark">
                    <Container>
                        <Navbar.Brand className='fullLogo' style={{marginRight:'0px'}} onClick ={(e) => {this.props.history.push ('/')}}>
                            <img 
                            src = {logo}
                            height = "43"
                            width = "25"
                            className = "d-inline-block align-top"
                            alt = "Logo"
                            /> <span className = "Logo">FufukWS</span>
                        </Navbar.Brand>
                        <Breakpoint customQuery="(max-width: 766px)">
                            <OverlayTrigger  show={this.isDisabled()} trigger="click" placement="bottom" overlay={popover} className = 'AuthIcon' >
                                <BsPersonFill className='HeadIcon' id = 'personButton' variant="success" cursor = "pointer" onClick={this.Flip}/>
                            </OverlayTrigger>
                            <AiOutlineShoppingCart  className='mr-1 HeadIcon' id = 'personButton' variant="success" cursor = "pointer" onClick={this.handleCartClick}/>
                        </Breakpoint>         
                        <Navbar.Toggle aria-controls = "responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className = "mr-auto allLinks">
                            <LinkContainer to = '/Catalog' className='CatalNav'>
                                <Nav.Link><span className='allLinks'>Каталог</span></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to = '/ZakazPortreta'>
                                <Nav.Link><span className='allLinks'>Заказать портрет</span></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to = '/FAQ'>
                                <Nav.Link><span className='allLinks'>FAQ</span></Nav.Link>
                            </LinkContainer>
                            </Nav>
                            <Breakpoint customQuery="(min-width: 765px)">
                                <OverlayTrigger  show={this.isDisabled()} trigger="click" placement="bottom" overlay={popover} className = 'AuthIcon' >
                                    <BsPersonFill className='HeadIcon' id = 'personButton' variant="success" cursor = "pointer" onClick={this.Flip}/>
                                </OverlayTrigger>
                            <AiOutlineShoppingCart className='HeadIcon'  id = 'personButton' variant="success" cursor = "pointer" onClick={this.handleCartClick}/>
                            </Breakpoint>
                            </Navbar.Collapse>
                            </Container>
                </Navbar>

             
            </>
        );
        
    }
    
}




export default withRouter(Header);