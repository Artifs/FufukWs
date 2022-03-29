import React, {useEffect, useState,useContext} from 'react'
import { UserContext } from "../App";
import { Container,Row,Col,Card,Tab,Nav  } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Carousel from 'react-bootstrap/Carousel';
import { ContactsOutlined } from '@material-ui/icons';

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
    const [UsersQuestions, setUsersQuestions] = useState('')
    const [UserStatus, setUserStatus] = useState('')
    const [ChangeStatusEmail, setChangeStatusEmail] = useState('')
    const [UsersOffers, setUsersOffers] = useState('')
    const [UsersOffersSend, setUsersOffersSend] = useState('')
    const [PortretsOffers, setPortretsOffers] = useState('')
    const [ChangeStatus, setChangeStatus] = useState('')
    const [spanTextSec, setSpanTextSec] = useState('Изменить')
    const [spanText, setSpanText] = useState('Изменить')
    const [ChangingSec, setChangingSec] = useState(false)
    const [Changing, setChanging] = useState(false)
    const [HistoryOrdersText, setHistoryOrdersText] = useState('Вы не совершали заказов')
    const [HistoryOrders, setHistoryOrders] = useState([])
    const [HistoryOrdersPortret, setHistoryOrdersPortret] = useState([])

    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        if(userEmail.email !== '' && userState.isLoggedIn === true){
            if(email === ''){
                setEmail (userEmail.email)
                var form = new FormData()
                form.append('email', userEmail.email);
                form.append('StrLog', true);
                fetch("http://g908020p.beget.tech",{
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
            form.append('JsonHisOrders',true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                const x = JSON.parse(response);
                setHistoryOrders(x);
                 if (x.length >= 1){
                     setHistoryOrdersText('История заказов')
                 }
            })
        }
        if(HistoryOrdersPortret == ''){
            var form = new FormData()
            form.append('email', userEmail.email);
            form.append('JsonHisOrdersPort',true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                const x = JSON.parse(response);
                setHistoryOrdersPortret(x);
                 if (x.length >= 1){
                     setHistoryOrdersText('История заказов')
                 }
            })
        }
     }, [])


     const LoadOffersSending = (e) => {
        if(UsersOffersSend == '' && UserStatus != 0){
            if (UserStatus == 1){
                setUserStatus(4)
            }
            var form = new FormData()
            form.append('UsersOffersSend', true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                const f = JSON.parse(response);
                console.log(f)
                setUsersOffersSend(f)
            })
        }
     }
     const CloseOfferSending = (e) =>{
        console.log(e.target.name)
        var form = new FormData()
        form.append('idOfferSending', e.target.name)
        form.append('CloseOfferSending', true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            console.log(response)
            if (response == "conf"){
                const z = document.getElementById('trtablehide'+e.target.name)
                console.log(e.target.name)
                z.style.display = 'none';
                alert.success(`Заказ выполнен` );
            }else{
                alert.error( 'Что-то пошло не так на сервере' );
            }
        })
     }
     const LoadQuest = (e) => {
        if(UsersQuestions == '' && UserStatus != 0){
            if (UserStatus == 1){
                setUserStatus(2)
            }
            var form = new FormData()
            form.append('TechSuppOrders', true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                const u = JSON.parse(response);
                console.log(u)
                setUsersQuestions(u)
            })
        }
     }

     const closeQuestion = (e) =>{
        console.log(e.target.name)
        var form = new FormData()
        form.append('idQuest', e.target.name)
        form.append('CloseQuest', true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            console.log(response)
            if (response == "conf"){
                alert.success(`Вопрос закрыт` );
                const z = document.getElementById('trtablehide'+e.target.name)
                console.log(e.target.name)
                z.style.display = 'none';
            }else{
                alert.error( 'Что-то пошло не так на сервере' );
            }
        })
    }

     const LoadPortretsOffers = (e) => {
        if(PortretsOffers == '' && UserStatus != 0){
            if (UserStatus == 1){
                setUserStatus(3)
            }
            var form = new FormData()
            form.append('PortretsOffers', true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                console.log(response)
                const h = JSON.parse(response);
                console.log(h)
                setPortretsOffers(h)
            })
        }
     }

     const CloseOfferPortret = (e) =>{
        console.log(e.target.name)
        var form = new FormData()
        form.append('idOfferPortret', e.target.name)
        form.append('CloseOfferPortret', true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            console.log(response)
            if (response == "conf"){
                const z = document.getElementById('trtablehide'+e.target.name)
                console.log(e.target.name)
                z.style.display = 'none';
                alert.success(`Заказ выполнен` );
            }else{
                alert.error( 'Что-то пошло не так на сервере' );
            }
        })
    }

     const CloseOffer = (e) =>{
        console.log(e.target.name)
        var form = new FormData()
        form.append('idOffer', e.target.name)
        form.append('CloseOffer', true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            console.log(response)
            if (response == "conf"){
                const z = document.getElementById('trtablehide'+e.target.name)
                z.style.display = 'none';
                alert.success(`Заказ выполнен` );
            }else{
                alert.error( 'Что-то пошло не так на сервере' );
            }
        })
    }

     const LoadOffers = (e) => {
        if(UsersOffers == '' && UserStatus != 0){
            if (UserStatus == 1){
                setUserStatus(3)
            }
            var form = new FormData()
            form.append('UsersOffers', true);
            fetch("http://g908020p.beget.tech",{
                method: 'POST',
                body: form
            })
            .then (response => response.text())
            .then(response => {
                const f = JSON.parse(response);
                console.log(f)
                setUsersOffers(f)
            })
        }
     }
     

    

    const isDisabled = (e) => {
        if (Changing === true){
            return false
        }else{
            return true
        }
    }

    const isDisabledSec = (e) => {
        if (ChangingSec === true){
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
        fetch("http://g908020p.beget.tech",{
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
        fetch("http://g908020p.beget.tech",{
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
        fetch("http://g908020p.beget.tech",{
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
                                
                                <h3>Адрес доставки <span className='ChangeText' onClick={FlipSec}>{spanTextSec}</span></h3><br/>
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
                                    <span className='numb'><h3>{HistoryOrdersText}</h3></span><br/>
                                </div>
                                </Col>
                                <Col className='HistoryOrders'>
                                { 
                                    HistoryOrders.map(el => {
                                        return(
                                        <div>
                                            <b>Дата заказа: {el.date}</b><br/>
                                            <b>Заказанный товар: {el.orderUser}</b><br/> <br/>
                                        </div>
                                        )
                                    })
                                }
                                {
                                    HistoryOrdersPortret.map(el =>{
                                        if(el.imagePortret.length > 45){
                                            el.imagePortret = el.imagePortret.slice(1)}
                                        return(
                                            <>
                                                <b>Дата заказа: {el.date}</b><br/>
                                                <b>Формат портрета: А{el.format}</b><br/>
                                                <img src={"http://g908020p.beget.tech"+el.imagePortret} className='imgOnAdmin'/><br/> <br/>
                                            </>
                                        )
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
            <br/><br/><br/><br/><br/>
            <Container>
                <Row> 
                    <Col>
                        <Card >
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title className='allLinks2' >Изменить статус</Card.Title>  
                            </Card.Body>
                            <div className='ChangeStatus'>
                            <label className="field field_v3 inpReg ml-3">
                                        <input type = 'text' className="field__input inpReg" value = {ChangeStatusEmail} onChange={(e) =>{setChangeStatusEmail ( e.target.value ) }} />
                                        <span className="field__label-wrap inpReg">
                                        <span className="field__label inpReg" >email</span>
                                        </span>
                                        </label>
                                        <br/>
                            <input className="ml-3" type='radio' name='status' value = 'Default User' onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; Default user <br/>
                            <input className="ml-3"  type='radio' name='status' value = 'Admin'  onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; Admin<br/> 
                            <input className="ml-3"  type='radio' name='status' value = 'TechSupp'  onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; Tech supp<br/> 
                            <input className="ml-3"  type='radio' name='status' value = 'Worker'  onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; Worker<br/> 
                            <input className="ml-3"  type='radio' name='status' value = 'Manager'  onClick = {(e) => {setChangeStatus(e.target.value)}}/>&nbsp; Manager<br/> 
                            <button className="AddToCartButt ml-3 mt-2 mb-2" onClick={ChangingUserStatus}>Изменить статус пользователя</button>
                            </div>
                        </Card> 
                    </Col>
                    <Col>
                        <Card >
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title className='allLinks2' >Функционал персонала</Card.Title>  
                            </Card.Body>
                            <div>
                            <div className = 'ProdNameDiv mb-2' >
                                <button className='nextButtonZakaz' onClick={LoadQuest}>Загрузить вопросы</button>
                            </div> 
                            <div className = 'ProdNameDiv mb-2' >
                                <button className='nextButtonZakaz' onClick={LoadOffers}>Загрузить заказы из каталога</button>
                            </div>
                            <div className = 'ProdNameDiv mb-2' >
                                <button className='nextButtonZakaz' onClick={LoadPortretsOffers}>Загрузить заказы портретов</button>
                            </div>
                            <div className = 'ProdNameDiv mb-2' >
                                <button className='nextButtonZakaz' onClick={LoadOffersSending}>Загрузить готовые заказы</button>
                            </div>
                            </div>
                        </Card> 
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
    else if(UserStatus == 2){
        if (UsersQuestions != ''){
        return (
            <div  className='QuestionsCont'>
            <Container>
                <Row> 
                    <Col>
                    </Col>
                    <Col sm ={12} md = {12} lg={12} xl={12}>
                    <br/><br/><br/>
                        <div className = 'ProdNameDiv mb-2' >
                            <span className = 'ProdName'>  Вопросы пользователей</span>
                        </div>
                        <table className='QuestionsCont'>
                        <thead>
                            <td><strong>Закрыть</strong></td>
                            <td><strong>Почта</strong></td>
                            <td><strong>Вопрос</strong></td>
                        </thead>
                        {
                            UsersQuestions.map(el => {
                                return(
                                <>
                                    <tr  id={'trtablehide'+el.id}>
                                        <td><button className='nextButtonZakaz' name={el.id} onClick={closeQuestion}>Закрыть</button></td>
                                        <td><span> {el.email} </span> <br/></td>
                                        <td className='questSpan'><span > {el.question} </span> <br/></td>
                                    </tr>
                                </>
                                )
                            })    
                        } 
                        </table>
                        </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
            </div>
        )}else{
            return (
                <>
                    <br/><br/><br/><br/>
                    <div className = 'ProdNameDiv mb-2' >
                        <button className='nextButtonZakaz' onClick={LoadQuest}>Загрузить вопросы</button>
                    </div>
                    
                </>
            )
        }
    }
        else if(UserStatus == 3){
            if (UsersOffers != ''){
                return (
                    <>
                    <br/><br/><br/>
                    <div className = 'ProdNameDiv mb-2' > <h1>Заказы</h1></div>
                    <table className='QuestionsCont'>
                        {
                            UsersOffers.map(el => {
                                return(
                                <>
                                    <Container className='QuestionsCont'>
                                        <Row> 
                                            <Col>
                                                <tr id={'trtablehide'+el.id}>
                                                    <td><button className='nextButtonZakaz' name={el.id} onClick={CloseOffer}>Готово</button></td>
                                                    <td><span> Товар: <strong>{el.orderUser}</strong> </span> <br/></td>
                                                    <td><span> Доп. примечание: {el.addictionalNote} </span> <br/></td>
                                                </tr>
                                            </Col>
                                        </Row> 
                                    </Container>
                                </>
                                )
                            })    
                        } 
                        </table>
                    </>
                )
            }else if (PortretsOffers != ''){
                return (
                    <>
                    <br/><br/><br/>
                    <Container className='QuestionsCont'>
                    <Row> 
                    <Col>
                    </Col>
                    <Col>
                    <div className = 'ProdNameDiv mb-2' > <h1>Заказы</h1></div>
                    <table className='QuestionsCont'>
                        <thead>
                            <td>Готово</td>
                            <td>Изображение</td>
                            <td>Формат</td>
                            <td>Доп. примечание</td>
                        </thead>
                        <tbody>
                        {
                            PortretsOffers.map(el => {
                                if(el.imagePortret.length > 45){
                                el.imagePortret = el.imagePortret.slice(1)}
                                return(
                                <>
                                    <tr id={'trtablehide'+el.id}>
                                        <td><button className='nextButtonZakaz' name={el.id} onClick={CloseOfferPortret}>Готово</button></td>
                                        <td><img src={"http://g908020p.beget.tech"+el.imagePortret} className='imgOnAdmin'/></td>
                                        <td><span>  <strong>A{el.format}</strong> </span> <br/></td>
                                        <td><span>  <strong>{el.addictionalNote}</strong> </span> <br/></td>
                                    </tr>
                                </>
                                )
                            })    
                        } 
                        </tbody>
                    </table>
                    </Col>
                    <Col>
                    </Col>
                    </Row> 
                    </Container>
                    </>
                )   
            }else{
                return (
                    <>
                        <br/><br/><br/><br/>
                        <div className = 'ProdNameDiv mb-2' >
                            <button className='nextButtonZakaz' onClick={LoadOffers}>Загрузить заказы из каталога</button>
                        </div>
                        <div className = 'ProdNameDiv mb-2' >
                            <button className='nextButtonZakaz' onClick={LoadPortretsOffers}>Загрузить заказы портретов</button>
                        </div>
                        
                    </>
                )   
            }}
            else if(UserStatus == 4){
                 if (UsersOffersSend != ''){
                     return(
                        <>
                        <br/><br/><br/>
                        <Container className='QuestionsCont'>
                        <Row> 
                        <Col>
                        </Col>
                        <Col>
                        <div className = 'ProdNameDiv mb-2' > <h1>Заказы</h1></div>
                        <table className='QuestionsCont'>
                            <thead>
                                <td>Статус</td>
                                <td>ФИО</td>
                                <td>Адресс</td>
                                <td>Заказ</td>
                                <td>Почта</td>
                                <td>Доп. примечание</td>
                            </thead>
                            <tbody>
                            {
                                UsersOffersSend.map(el => {
                                   
                                    return(
                                    <>
                                        <tr id={'trtablehide'+el.id}>
                                            <td><button className='nextButtonZakaz' name={el.id} onClick={CloseOfferSending}>Отправлено</button></td>
                                            <td><span>  <strong>{el.FIO}</strong> </span> </td>
                                            <td><span>  <strong>{el.Adress}</strong> </span> </td>
                                            <td><span>  <strong>{el.orderUser}</strong> </span> </td>
                                            <td><span>  <strong>{el.email}</strong> </span> </td>
                                            <td><span>  <strong>{el.addictionalNote}</strong> </span> </td>
                                        </tr>
                                    </>
                                    )
                                })    
                            } 
                            </tbody>
                        </table>
                        </Col>
                        <Col>
                        </Col>
                        </Row> 
                        </Container>
                    </>)
                 }else{
                    return (
                        <>
                        <br/><br/><br/><br/>
                        <div className = 'ProdNameDiv mb-2' >
                            <button className='nextButtonZakaz' onClick={LoadOffersSending}>Загрузить заказы из каталога</button>
                        </div>
                        </>
                    )
                }
        }else{
            return(
                <>
                <br/><br/><br/><br/><br/>
                <div className = 'ProdNameDiv mb-2' > <h1>Загрузка</h1>
                    <br/><br/><br/> <br/>
                    <div class="loadingio-spinner-dual-ring-0i3eilzu4zqn"><div class="ldio-wr6v1tla7ab"><div></div><div><div></div></div></div></div>

                </div>
                </>
            )
        }
}