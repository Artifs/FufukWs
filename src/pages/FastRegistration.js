import React, { Component } from 'react'
import { Container,Row,Col,Button  } from 'react-bootstrap';

export default class FastRegistration extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            rpassword:'',
            mailFormat: false,
            rpass: false,
            error: '',
            bttnClicked:false,
            register:true,
            fetched : false
        }
    }

    HundleCheck = (e) => {
        const password = this.state.password;
        const email = this.state.email;
        const register = this.state.register;
        var form = new FormData()
        form.append('email', email);
        form.append('password', password);
        form.append('register', register);
        fetch("http://localhost/projects/server/index.php",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if(response ==='Conf'){
                this.setState({error:'Регистрация прошла успешно, авторизируйтесь'})
                
            }else if (response === 'emailIsbusy'){
                this.setState({error:'Почта уже зарегистрированна'})
            }else{
                this.setState({error:'Возникла неизвестная ошибка, обратитесь в тех. поддержку или попробуйте позже'})
            }
            
        })
    }

    infCheck = (e) => {
        let email = this.state.email
        let mailform = false
        let rpas = false
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(String(email).toLowerCase()) === true ) {
            this.setState({
                mailFormat: true,
                error:''
            })
            mailform = true
        }else {
            this.setState({
                mailFormat: false,
                error: 'Email некорректен'
            })
            mailform = false;
            return
        }
        if(this.state.password.length < 8){
            this.setState({
                error:'Пароль слишком короткий'
            })
            return
        }
        if(this.state.password !== this.state.rpassword){
            this.setState({
                rpass: false,
                error:'Пароли не совпадают'
        });
        rpas = false
        return
        }else if (this.state.password === this.state.rpassword){
            this.setState({
                rpass: true,
                error:'' 
        })
        rpas = true
        this.AllRight(mailform,rpas)
    } 
    }
    AllRight = (e) => {
        if (e === true ){
            if(this.state.fetched === false){
                this.HundleCheck();
                this.setState({fetched:true})
            }
        }
    }
    isDisabled = (e) => {
        if (this.state.email === '' || this.state.password === '' || this.state.rpassword === ''){
            return true
        }else{
            return false
        }
    }

    render() {
        return (
            <div className = 'reg'>
               <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1>Регистрация</h1><br/>
                        <label className="field field_v3 inpReg">
                        <input type="email" className="field__input inpReg" value = {this.state.email} placeholder="example@gmail.com"   onChange={(e) => {this.setState({email: e.target.value , fetched : false})}} />
                        <span className="field__label-wrap inpReg">
                        <span className="field__label inpReg">E-mail </span>
                        </span>
                        </label>
                        <br/>
                        <label className="field field_v3 inpReg">
                        <input type = 'password' className="field__input inpReg" value = {this.state.password} placeholder="********"   onChange={(e) => {this.setState({password: e.target.value , fetched : false})}} />
                        <span className="field__label-wrap inpReg">
                        <span className="field__label inpReg" >Пароль</span>
                        </span>
                        </label>
                        <br/>
                        <label className="field field_v3 inpReg">
                        <input type = 'password' className="field__input inpReg" value = {this.state.rpassword} placeholder="********"   onChange={(e) =>{this.setState({rpassword: e.target.value, fetched : false})}} />
                        <span className="field__label-wrap inpReg">
                        <span className="field__label inpReg" >Повтор пароля</span>
                        </span>
                        </label>
                        <br/>
                        <div className='ButReg'>
                        <button className='nextButtonZakaz mb-2 text-center' disabled = {this.isDisabled()} onClick = {this.infCheck}>Зарегистрироваться</button>
                        </div>
                        <div><br/>{this.state.error}</div>
                    </Col>
                    <Col></Col>
                </Row>
                </Container>
            </div>
        )
    }
}
