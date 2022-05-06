import React, { useEffect, useContext, useState } from 'react'
import { Container,Row,Col,Tab,Nav  } from 'react-bootstrap';
import { UserContext } from "../App";
import { useAlert } from "react-alert";
import { LinkContainer } from "react-router-bootstrap";


export default function TechSupp(props) {
    const { userState, setUserState } = useContext(UserContext)
    const { userEmail, setEmailState } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [Question, setQuestion] = useState('')
    const alert = useAlert();

    useEffect(() => {
        if(userState.isLoggedIn === true && email === ''){
            setEmail(userEmail.email)
        }
    }, []);

    const isDisabled = (e) => {
        if (email !== ''  && Question != ''){
            return false
        }else{
            return true
        }
    }

    const SendQuestion = (e) => {
        var form = new FormData()
        form.append('email', email);
        form.append('question', Question);
        form.append('TechSuppQuest', true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then (response => response.text())
        .then(response => {
            if (response == "Conf"){
                alert.success(`Ваш вопрос отправлен` );
            }else{
                alert.error( 'Что-то пошло не так, попробуйте обратиться позже' );
            }
        })
    }
        return (
            <div className='MarginTop'>
                    
                            <div className = 'ProdNameDiv mb-5' >
                                <span className = 'ProdName'>Техническая поддержка</span><br/> <br/>
                                <LinkContainer to={`/FAQ`}><Nav.Link className='DontBlueText'>Подробнее о правилах технической поддержки читайте в <a className='Hyperlink'>FAQ</a></Nav.Link></LinkContainer> 
                            </div>
                        
                    <Container>
                    <Row>
                        <Col>
                            <label className="field field_v3 QuestLine">
                            <input className="field__input" placeholder="example@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            <span className="field__label-wrap QuestLine">
                            <span className="field__label QuestLine">Email</span>
                            </span>
                            </label>

                            <label className="field field_v3 QuestLine mb-3">
                            <input className="field__input" placeholder="  " value={Question} onChange={(e) => {setQuestion(e.target.value)}}/>
                            <span className="field__label-wrap QuestLine">
                            <span className="field__label QuestLine">Ваш вопрос</span>
                            </span>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className='nextButtonQuest  mt-4' disabled = {isDisabled()} onClick = {SendQuestion}>Далее</button> 
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }