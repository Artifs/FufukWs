import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App";
import { useAlert } from "react-alert";
import { Container,Row,Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function ZakazPortretaOformlenie(props) {
    const { userState, setUserState } = useContext(UserContext)
    const { portretCash, setPortretCash } = useContext(UserContext)
    const { userEmail, setEmailState } = useContext(UserContext)
    const { filesPortret, setFilesPortret } = useContext(UserContext)
    const [clicked, setClicked] = useState(false)
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
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        console.log(filesPortret)
        if (portretCash.CashPortret[0] != 2 && portretCash.CashPortret[0] != 3 && portretCash.CashPortret[0] != 4){
            history.push ('/')
        }
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
            console.log(a)
                setEmail(userEmail.email)
                setName (a[0])
                setSecName (a[1])
                setLastName(a[2])
                setCountry (a[4])
                setCity (a[5])
                setRegion (a[6])
                setApartmets (a[7])
                setIndexCity (a[3])
        })
    }, [])
    
    const HundleCheck = (e) => {
            setClicked(true)
            var form = new FormData()
            form.append('ZakazPortreta',true);
            form.append('email', email);
            form.append('name', name);
            form.append('file', filesPortret.filesPortret[0]);
            form.append('secName', secName);
            form.append('lastName', lastName);
            form.append('indexCity', indexCity);
            form.append('Country', Country);
            form.append('City', City);
            form.append('Region', Region);
            form.append('Apartmets', Apartmets);
            form.append('Format', portretCash.CashPortret[0]);
            form.append('Summ', portretCash.CashPortret[1]);
            form.append('addictionalNote',addictionalNote)
            axios.post('http://g908020p.beget.tech', form)
            .then(response => {
                if (response.data == 'conf'){
                    alert.success('Ваш заказ портрета оформлен');
                }else{
                    alert.error('Что-то пошло не так, обратитесь в тех. поддержку');
                }
            })
        }
        const isDisabled = (e) => {
            if (email !== '' && name !== '' && secName !== '' && lastName !== '' && indexCity !== '' && Country !== '' && City !== '' && Region !== '' && Apartmets !== ''){
                return false
            }else{
                return true
            }}
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
                    
                    <label className="field field_v3">
                    <input type = 'number' className="field__input" id = 'indexCityInput' placeholder="152150" value={indexCity} onChange={(e) => {setIndexCity(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Почтовый индекс</span>
                    </span>
                    </label>
                    
                    <label className="field field_v3 ">
                    <input className="field__input" placeholder="Россия" value={Country} onChange={(e) => {setCountry(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Страна</span>
                    </span>
                    </label>

                    <label className="field field_v3">
                    <input className="field__input" placeholder="Москва" value={City} onChange={(e) => {setCity(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Город</span>
                    </span>
                    </label>

                    <label className="field field_v3 ">
                    <input className="field__input" placeholder="Московская область" value={Region} onChange={(e) => {setRegion(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Край/область/регион</span>
                    </span>
                    </label>

                    <label className="field field_v3 ">
                    <input className="field__input" placeholder=" " value={Apartmets} onChange={(e) => {setApartmets(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Улица, дом, квартира</span>
                    </span>
                    </label>

                    <label className="field field_v3 mb-3">
                    <input className="field__input" placeholder=" " value={addictionalNote} onChange={(e) => {setAddictionalNote(e.target.value)}}/>
                    <span className="field__label-wrap">
                    <span className="field__label">Дополнительные примечания</span>
                    </span>
                    </label>
                    <button className='nextButton mt-4' disabled = {isDisabled()} onClick = {HundleCheck}>Далее</button>
                    </Col>
                    <Col className='CartCol'>
                        <h3>Портрет А{portretCash.CashPortret[0]}</h3>
                        <h3 className='mb-5'>Сумма: {portretCash.CashPortret[1]} RUB</h3>
                        <h3>Изображение портрета</h3><br/>
                        <img src={filesPortret.filesPortret[1]} className='ImageOnOform'/>
                    </Col>
                    </Row>
                </Container>
                
                </div>
                </div>
        )
    }
