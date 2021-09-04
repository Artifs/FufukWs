import React, {useEffect, useState,useContext} from 'react'
import { UserContext } from "../App";
import { Container,Row,Col,Card,Tab,Nav  } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export default function Account(props) {
    const { userState, setUserState } = useContext(UserContext)
    const { userEmail, setEmailState } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [secName, setSecName] = useState('')
    const [lastName, setLastName] = useState('')
    const [Country, setCountry] = useState('')
    const [City, setCity] = useState('')
    const [Region, setRegion] = useState('')
    const [Apartmets, setApartmets] = useState('')
    const [Index, setIndex] = useState('')
    const [UserStatus, setUserStatus] = useState('')
    const [ChangeStatusEmail, setChangeStatusEmail] = useState('')
    const [ChangeStatus, setChangeStatus] = useState('')
    const [spanTextSec, setSpanTextSec] = useState('Изменить')
    const [spanText, setSpanText] = useState('Изменить')
    const [ChangingSec, setChangingSec] = useState(false)
    const [Changing, setChanging] = useState(false)
    const [HistoryOrders, setHistoryOrders] = useState([])
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        if(userEmail.email !== '' && userState.isLoggedIn === true){
            if(email === ''){
                setEmail (userEmail.email)
                var form = new FormData()
                form.append('email', userEmail.email);
                form.append('StrLog', true);
                fetch("http://localhost/projects/server/index.php",{
                    method: 'POST',
                    body: form
                })
                .then (response => response.text())
                .then(response => {
                    
                    const a = response.split(';');
                    console.log(a)
                        setName (a[0])
                        setSecName (a[1])
                        setLastName(a[2])
                        setCountry (a[4])
                        setCity (a[5])
                        setRegion (a[6])
                        setApartmets (a[7])
                        setIndex (a[3])
                        setUserStatus(a[8])
                })
            } 
        }else if (userEmail.email === '' && userState.isLoggedIn === false){
            history.push ('/')
        }
        if(HistoryOrders ==''){
            var form = new FormData()
            form.append('email', userEmail.email);
            form.append('HistoryOrders',true);
            fetch("http://localhost/projects/server/index.php",{
                method: 'POST',
                body: form
            })
            .then(response => response.text())
            .then(response => {
                const a = response.split(',');
                setHistoryOrders(a);
            })
        }
     }, [])

    const isDisabled = (e) => {
        if (Changing === true){
            return false
        }else{
            return true
        }
    }

    const saveAdressPers = (e) => {
        var form = new FormData()
        form.append('email', email);
        form.append('Country', Country);
        form.append('City', City);
        form.append('Region', Region);
        form.append('Apartmets', Apartmets);
        form.append('Index', Index);
        form.append('isChangeAdressPers', true);
        fetch("http://localhost/projects/server/index.php",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response === 'loadAcceptAdress'){
                    setChangingSec( false )
                    setSpanTextSec( 'Изменить' ) 
                    alert.success( 'Данные сохранены' );
            }else{
                    setChangingSec (false) 
                    setSpanTextSec('Изменить')
                    alert.error( 'Что-то пошло не так, обратитесь в тех.поддержку' );

            }
            
        })
    }
    
    const savePersData = (e) => {
        var form = new FormData()
        form.append('name', name);
        form.append('email', email);
        form.append('secName', secName);
        form.append('lastName', lastName);
        form.append('isChangePers', true);
        fetch("http://localhost/projects/server/index.php",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response === 'loadAcceptPersData'){
                    setChanging( false ) 
                    setSpanText( 'Изменить' )
                    alert.success( 'Данные сохранены' );
            }else{
                    setChanging (false)
                    setSpanText('Изменить')
                    alert.error( 'Что-то пошло не так, обратитесь в тех.поддержку' );
            }
        })
    }


    const ChangingUserStatus = (e) => {
        var form = new FormData()
        form.append('email', ChangeStatusEmail);
        form.append('status', ChangeStatus);
        form.append('ChangingUserStatus', true);
        fetch("http://localhost/projects/server/index.php",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response == "1"){
                alert.success(`Статус изменён на ${ChangeStatus}` );
            }else{
                alert.error( 'Что-то пошло не так на сервере' );
            }
        })
    }

    const isDisabledSec = (e) => {
        if (ChangingSec === true){
            return false
        }else{
            return true
        }
    }

    const Flip = (e) => {
            setChanging ( !Changing )
            setSpanText ('Отменить' )
        if(spanText === 'Отменить'){
                setSpanText ( 'Изменить' )
        }
    }

    const FlipSec = (e) => {
            setChangingSec (!ChangingSec)
            setSpanTextSec ('Отменить')
        if(spanTextSec === 'Отменить'){
                setSpanTextSec ('Изменить')
        }
    }

    const LogOut = (e) => {
            setUserState((p) => ({ ...p, isLoggedIn: false}))
            setEmailState((e) => ({ ...e , email:''}))
            history.push ('/')
        
    }
    const isValidDate = (date) => {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
      }
      if (UserStatus == 0){
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <Container><Row><Col><Container><Row><Col>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col  sm={3}>
                        <Nav variant="pills" className="flex-column navLinks">
                            <Nav.Item >
                            <Nav.Link  eventKey="first" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}><span className='textNav'>Личные данные</span></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second" style={{padding:'.3rem 1.9rem', borderRadius:'20pt'}}><span className='textNav'>Мои заказы</span></Nav.Link>
                            </Nav.Item>
                            <button className='nextButtonZakaz mt-5 mb-5' onClick={LogOut}>Выйти из аккаунта</button><br/>

                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h3>Персональные данные <span className='ChangeText' onClick={Flip}>{spanText}</span></h3><br/>
                                

                                <Container>
                                <Row>
                                    <Col>Имя<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabled()}  type = 'text' className="field__input inpReg" value = {name}    onChange={(e) =>{setName( e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label>
                                        </Col>
                                    <Col>Фамилия<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabled()}  type = 'text' className="field__input inpReg" value = {secName}      onChange={(e) =>{setSecName (e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>
                                    <Col>Отчество<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabled()}  type = 'text' className="field__input inpReg" value = {lastName}     onChange={(e) =>{setLastName ( e.target.value ) }} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>
                                    <Col>Эл. почта<br/><label className="field field_v3 inpReg">
                                        <input disabled  type = 'text' className="field__input inpReg" value = {email}  />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>

                                </Row>
                                </Container>
                                <br/>
                                <button className='nextButtonZakaz mb-3 mr-2' disabled={isDisabled()} onClick={savePersData}>Сохранить</button><br/>
                                
                                <h3>Адрес достави <span className='ChangeText' onClick={FlipSec}>{spanTextSec}</span></h3><br/>
                                <Container>
                                <Row>
                                    <Col>Страна<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabledSec()}  type = 'text' className="field__input inpReg" value = {Country} onChange={(e) =>{setCountry ( e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label>
                                        </Col>
                                    <Col>Город<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabledSec()}  type = 'text' className="field__input inpReg" value = {City} onChange={(e) =>{setCity ( e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>
                                    <Col>Край/область/регион<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabledSec()}  type = 'text' className="field__input inpReg" value = {Region} onChange={(e) =>{setRegion ( e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>
                                    <Col>Улица, дом, квартира<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabledSec()} type = 'text' className="field__input inpReg" value = {Apartmets} onChange={(e) =>{setApartmets ( e.target.value )}} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>
                                        <Col>Почтовый индекс<br/><label className="field field_v3 inpReg">
                                        <input disabled = {isDisabledSec()} type = 'text' className="field__input inpReg" value = {Index} onChange={(e) =>{setIndex ( e.target.value ) }} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" ></span>
                                        </span>
                                        </label></Col>   
                                </Row>
                                </Container>
                                <br/>
                                <button className='nextButtonZakaz mb-3' disabled={isDisabledSec()} onClick={saveAdressPers}>Сохранить</button><br/>

                                <br/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Row xs={1} sm ={1} md = {1} lg={1} xl={1}>
                                    <Col>
                                <div className='CardBody mb-4 '>
                                    <span className='numb'><h3>История заказов</h3></span><br/>
                                </div>
                                </Col>
                                <Col className='HistoryOrders'>
                                { 
                                    HistoryOrders.map((el,i) => {
                                        if (el != ''){
                                            if (!isNaN(el)){
                                                return(
                                                    <span>
                                                        Кол-во <span className='boldText'>{el}</span> <br/>
                                                    </span>
                                                )
                                            }else if (el.includes('Портрет')){
                                                return(
                                                    <span>
                                                        <span className='boldText'>{el}</span> <br/>
                                                    </span>
                                                )
                                            }else if ((!isNaN(Date.parse(el ) ))){
                                                console.log( el ) 
                                                return(
                                                    <span>
                                                        <span className='boldText'>{el}</span> <br/> <br/>   
                                                    </span>
                                                )
                                            }else{
                                                return(
                                                    <span>
                                                        <span className='boldText'>{el}</span>&nbsp; -&nbsp; 
                                                    </span>
                                                )
                                            }
                                        }
                                    })
                                }
                                </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                    </Col>
                </Row>
                </Container>
                    </Col>
                </Row>
                </Container>
            </div>
        )

    }else if(UserStatus == 1){

        return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container>
                <Row> 
                    <Col>
                        <Card >
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title className='allLinks2' >Изменить статус</Card.Title>  
                            </Card.Body>
                            <div>
                            <label className="field field_v3 inpReg ml-3">
                                        <input type = 'text' className="field__input inpReg" value = {ChangeStatusEmail} onChange={(e) =>{setChangeStatusEmail ( e.target.value ) }} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" >email</span>
                                        </span>
                                        </label>
                                        <br/>
                            <input className="ml-3" type='radio' name='status' value = 'Default User' onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp;default user <br/>
                            <input className="ml-3"  type='radio' name='status' value = 'Admin'  onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; admin<br/> 
                            <button className="AddToCartButt ml-3 mt-2 mb-2" onClick={ChangingUserStatus}>Изменить статус пользователя</button>
                            </div>
                        </Card> 
                    </Col>
                    <Col>
                        <Card >
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title className='allLinks2'>Добавить товар</Card.Title>  
                            </Card.Body>
                        </Card> 
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}