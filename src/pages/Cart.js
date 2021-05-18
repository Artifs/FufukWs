import React, { useState,useEffect, useContext } from 'react'
import { UserContext } from "../App";
import { Container,Row,Col } from 'react-bootstrap';


export default function Cart(props) {
    const { userState, setUserState } = useContext(UserContext)
    const { userCart, setUserCart } = useContext(UserContext)
    const { userEmail, setEmailState } = useContext(UserContext)
    const { filesPortret, setFilesPortret } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [secName, setSecName] = useState('')
    const [lastName, setLastName] = useState('')
    const [indexCity, setIndexCity] = useState('')
    const [Country, setCountry] = useState('')
    const [City, setCity] = useState('')
    const [Region, setRegion] = useState('')
    const [Apartmets, setApartmets] = useState('')
    const [addictionalNote, setAddictionalNote] = useState('-')
    const [cart, setCart] = useState([])
    let Summ = 0

    // продумать отправку заказа на сервер, так-же подумать, как принимать формат портрета

    useEffect(() => {
        if(userState.isLoggedIn === true && email === ''){
            setEmail(userEmail.email)
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
                    setName(a[0])
                    setSecName(a[1])
                    setLastName(a[2])
                    setCountry (a[4])
                    setCity(a[5])
                    setRegion (a[6])
                    setApartmets (a[7])
                    setIndexCity (a[3])

            })
        }
         setCart(userCart.cart) 
    }, []);
    const isDisabled = (e) => {
        if (email !== '' && name !== '' && secName !== '' && lastName !== '' && indexCity !== '' && Country !== '' && City !== '' && Region !== '' && Apartmets !== '' && cart != ''){
            return false
        }else{
            return true
        }
    }
        return (
            <div>
 
                <div className='textSecond'>
                    <h2 className='text-center mb-5'>Оформление заказа</h2>
                <Container>
                    <Row className='text-center' xs = {1} sm ={1} md = {1} lg={2} xl={2}>
                    <Col >
                    <label className="field field_v3">
                    <input className="field__input" placeholder="Иван" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Имя </span>
                    </span>
                    </label>
                    
                    
                    <label className="field field_v3">
                    <input className="field__input" placeholder="Иванов" value={secName} onChange={(e) => {setSecName(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Фамилия </span>
                    </span>
                    </label>
                    
                    <label className="field field_v3">
                    <input className="field__input" placeholder="Иванович" value={lastName} onChange={(e) => {setLastName( e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Отчество </span>
                    </span>
                    </label>
                   
                    <label className="field field_v3">
                    <input className="field__input" placeholder="example@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Email</span>
                    </span>
                    </label>
                   
                    <br/>
                    
                    <label className="field field_v3">
                    <input type = 'number' className="field__input" id = 'indexCityInput' placeholder="152150" value={indexCity} onChange={(e) => {setIndexCity(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Почтовый индекс</span>
                    </span>
                    </label>
                   
                    <br/>
                    
                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder="Россия" value={Country} onChange={(e) => {setCountry(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Страна</span>
                    </span>
                    </label>
                    
                    <br/>

                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder="Москва" value={City} onChange={(e) => {setCity(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Город</span>
                    </span>
                    </label>
                    
                    <br/>

                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder="Московская область" value={Region} onChange={(e) => {setRegion(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Край/область/регион</span>
                    </span>
                    </label>
                    
                    <br/>

                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder=" " value={Apartmets} onChange={(e) => {setApartmets(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Улица, дом, квартира</span>
                    </span>
                    </label>
                    
                    <br/>


                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder=" " value={addictionalNote} onChange={(e) => {setAddictionalNote(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Дополнительные примечания</span>
                    </span>
                    </label>
                    <button className='nextButton mt-4' disabled = {isDisabled()} onClick = {(e) => {console.log(filesPortret)}}>Далее</button>
                    </Col>
                    <Col className='CartCol'>
                    {cart.length >= 1 && 
                    <h3>Ваш заказ</h3>}
                        <div className='CartDiv'> 
                        {cart.length < 1 && 
                        <div>
                        <br/>
                        <h4>Ваша корзина пуста</h4>
                        <br/>
                        </div>}
                        {
                            cart.map(el => (
                                <div className='mb-2'>
                                    <div className='s'><span className='MainText'>{el[0]}</span></div> 
                                    Количество: <span className='MainText'>{el[1]}</span> <br/>
                                    <span className='MainText'>{el[1]*el[2]} RUB</span>
                                    <div className='hrlines'><hr className='HrLine mt-2'/></div>
                                </div>
                                
                            ))
                            
                        }
                        
                        </div>
                        {
                            cart.map(el => {
                               Summ = Summ +(el[1]*el[2]) 
                            })
                        }
                        {cart.length >= 1 && 
                        <h3 className='mb-5'>Сумма: {Summ} RUB
                        </h3>}
                    </Col>
                    </Row>
                </Container>
                
                </div>
                </div>
    )
}


