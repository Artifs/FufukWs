import React, { useState,useEffect, useContext } from 'react'
import { UserContext } from "../App";
import { Container,Row,Col } from 'react-bootstrap';
import itemList from '../catalog.json'
import axios from 'axios'


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
    const [tovar, setTovar] = useState([])
    let Summ = 0


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
         userCart.cart.find((x) => {
            let s  = x[1]
            itemList.items.find((e) => {
                if (e.id == x[0]){
                    
                    setTovar ((oldItems) => [...oldItems, [e,s]])
                }
            })
            if( x[0] == 999){
                setTovar ((oldItems) => [...oldItems, [x]])
            }
        }
        )

    }, []);
    const sendCart = (e) =>{
        let f = 1
        let names = ''
        // console.log(tovar)
        // console.log(userCart.cart)
        // console.log(filesPortret.filesPortret)
        var form = new FormData()
        form.append('Order', true);
        form.append('email', email);
        form.append('name', name);
        form.append('secName', secName);
        form.append('lastName', lastName);
        form.append('indexCity', indexCity);
        form.append('Country', Country);
        form.append('City', City);
        form.append('Region', Region);
        form.append('Apartmets', Apartmets);
        form.append('summ', Summ);
        form.append('addictionalNote',addictionalNote)
        tovar.map((el,t) => {
            if(el.length > 1){
                names = names+el[0].Name+','+el[1]+","
            }else{
                names = names+'Портрет А'+el[0][1]+','
            }
            // console.log(el[0])
            // console.log(el[1])
        })
        console.log(names)
        form.append('tovar', names);
        filesPortret.filesPortret.map((el,i) => {
            //console.log(el[0])
            if(el[0] != 'notFile'){
                form.append('files'+f, el[0])
                f++
                //console.log(form)
            }
            // for(var pair of form.entries()) {
            //     console.log(pair[0]);
            //     console.log(pair[1]);
            
            //  }
        })
        
        axios.post('http://localhost/projects/server/index.php', form)
        .then((response) => {
            console.log(response)
        })
    }
    const isDisabled = (e) => {
        if (email !== '' && name !== '' && secName !== '' && lastName !== '' && indexCity !== '' && Country !== '' && City !== '' && Region !== '' && Apartmets !== '' && cart != ''){
            return false
        }else{
            return true
        }
    }
    let is = 0
    const deleteItem = (e) => {
        setTovar(tovar.filter((item, i) => i !== e))
        let a  = userCart.cart.splice(e,1)
        let b = filesPortret.filesPortret.splice(e,1)
    }

    if (cart == '') {
            return (
                <> <div className='text-center'>
                <br/>
                <br/>
                <br/>
                <h4 className='mt-5'>Ваша корзина пуста</h4>
                </div></>
            )
        }else{
        
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
                    <button className='nextButton mt-4' disabled = {isDisabled()} onClick = {sendCart}>Далее</button>
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
                            tovar.map((el,i) => {
                                if(el.length>1){
                                
                                return(
                                <>
                                <Row className='mb-2' xs = {2} sm ={2} md = {2} lg={2} xl={2}>
                                    <Col xs = {9} sm ={9} md = {9} xl = {9} lg ={9} className='CartInf'>
                                    <div ><span className='MainText'>{tovar[i][0].Name}</span></div> 
                                    Количество: <span className='MainText'>{tovar[i][1]}</span> <br/>
                                    <span className='MainText'>{tovar[i][0].price} RUB</span>
                                    </Col>
                                    <Col xs = {3} sm ={3} md = {3} lg={3} xl={3}>
                                    <div className='deleteBut'><button className='deleteButton' onClick={(e) => {deleteItem(i)}}>X</button></div>
                                    </Col>
                                    </Row>
                                    <div className='hrlines'><hr className='HrLine mt-2'/></div>
                                
                                </>
                                )}else{
                                    return(
                                        <>
                                    <Row className='mb-2' xs = {2} sm ={2} md = {2} lg={2} xl={2}>
                                    <Col xs = {9} sm ={9} md = {9} xl = {9} lg ={9} className='CartInf'>
                                    <div ><span className='MainText'>Портрет</span></div> 
                                    Формат: <span className='MainText'>A{el[0][1]}</span> <br/>
                                    <span className='MainText'>{el[0][2]} RUB</span>
                                    </Col>
                                    <Col xs = {3} sm ={3} md = {3} lg={3} xl={3}>
                                    <div className='deleteBut'><button className='deleteButton' onClick={(e) => {deleteItem(i)}}>X</button></div>
                                    </Col>
                                    </Row>
                                    <div className='hrlines'><hr className='HrLine mt-2'/></div>
                                    </>
                                    )}
                            })
                            
                        }
                        
                        </div>
                        {
                            
                            tovar.map((el,i) => {
                            if(el.length>1){
                                Summ = Summ + (Number(tovar[i][0].price) * tovar[i][1])
                            }else{
                                Summ = Summ + el[0][2]
                            }
                        })

                        }

                        {
                            cart.length >= 1 && 
                            <h3 className='mb-5'>Сумма: {Summ} RUB</h3>
                        }
                    </Col>
                    </Row>
                </Container>
                
                </div>
                </div>
        )
        
}

}
