import React, { Component } from 'react'
import { Card,CardGroup } from 'react-bootstrap'
import A2 from '../assets/A2NewExample.png'
import A3 from '../assets/A3NewExample.png'
import A4 from '../assets/A4NewExample.png'
import { Link } from 'react-router-dom'






class ZakazPortreta extends Component {
    constructor(props){
        super(props)

        this.state = {
            choosen: '',
            headText: 'Выберите формат портрета',
            clicked: false
        }   

    this.portretSize = this.portretSize.bind(this);  
    }
        portretSize = (a) => {
            this.setState({
                choosen: a,
                headText: 'Выбранный формат: A',
                clicked: true
            })
    }

    isDisabled = (e) => {
        if (this.state.clicked === true){
            return false
        }else{
            return true
        }
    }

    render() {
        const location = {
            pathname: '/ZakazPortretaSecond',
            state: {
                choosen: this.state.choosen
            }
        }
        return (
            <div className = "ZakazDiv MarginTop ">
                <h2>{this.state.headText}{this.state.choosen}</h2><br/>
                    <Link to={location}><button className='nextButtonZakaz mb-3' disabled = {this.isDisabled()}>Далее</button></Link>
                <CardGroup >
                    <Card className = 'mainCard'>
                        <Card.Body className = "cards" onClick={()=> this.portretSize(4)}>
                            <Card.Title>А4</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">210×297 мм</Card.Subtitle>
                            <Card.Text>
                                <img src = {A4} width = "100%" height = "100%"/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className = 'mainCard'>
                        <Card.Body className = "cards" onClick={()=> this.portretSize(3)}>
                            <Card.Title>А3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">297 x 420 мм</Card.Subtitle>
                            <Card.Text>
                            <img src = {A3} width = "100%" height = "100%"/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className = 'mainCard'>
                        <Card.Body className = "cards" onClick={()=> this.portretSize(2)}>
                            <Card.Title>А2</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">	420 x 594 мм</Card.Subtitle>
                            <Card.Text>
                            <img src = {A2} width = "100%" height = "100%"/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        )
    }
    
}



export default ZakazPortreta;