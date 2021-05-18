import React, {useEffect, useState} from 'react'
import itemList from '../catalog.json'
import { Container,Row,Col,Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { UserContext } from "../App";
import { useAlert } from "react-alert";

export default function Product(props) {
    const [timedId, setTimedId] = useState(null)
    const [Count, setCount] = useState(1)
    const [addCart, setAddCart] = useState()
    const [catalog, setCatalog] = useState([])
    const [tovar, setTovar] = useState([])
    const [recomendation, setRecomendation] = useState([])
    const alert = useAlert();
    const history = useHistory();
    const location = {
        pathname: '/Product2',
        state:{
            id: timedId
        }
    }

    useEffect(() => {
        setCatalog(itemList.items)
        while (true) {
            const min = 1;
            const max = itemList.items.length;
            const rand = min + Math.random() * (max - min);
            if (Math.round(rand) > 3){
                setRecomendation(Math.round(rand))
                return
            }
        }
        
     }, [])

     const AddToCart = (e) => {
        setAddCart(true)
        alert.success('Товар успешно добавлен в корзину');
     }

    if (location.state.id === timedId && timedId !== null){
        history.push(location)
    }
    if (props.location.state === undefined){
            history.push('/')
            return (<div></div>)
        }
        let id = [props.location.state.id]
    if (Count > 10){
        setCount(10)
    }else if(Count < 1){
        setCount(1)
    }else if (Count)
    if (tovar == '' ){
    return (
        <div>
            
            {
                JSON.stringify(catalog, function (key, value){
                    for (let i in value){
                        if (value[i].id == id && tovar == ''){
                            setTovar(value[i])
                            
                            return
                        }
                    }
                    
                })
                
            }
            
        </div>
    )
    }else{

        return (
            <div className='MarginTop mb-5'>
                <UserContext.Consumer>
                    {(value) =>{
                        if(addCart === true){
                            value.setUserCart((p) => ({ ...p, cart:[ ...value.userCart.cart , [tovar.Name , Count, tovar.price]] }))
                            setAddCart(false)
                        }
                    }
                } 
                </UserContext.Consumer>
                
                <Container>
                <Row> 
                    <Col>
                    <div className = 'ProdNameDiv mb-5' >
                        <span className = 'ProdName'>{tovar.Name}</span>
                    </div>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Carousel>
                            {
                                tovar.images.map(im => (
                                    <Carousel.Item >
                                        <img 
                                            className = "d-block w-100 CarouselImg"
                                            src = { im }
                                        />
                                    </Carousel.Item>
                                ))
                            }
                            </Carousel>
                        </Col>
                        <Col>
                            <div className='mb-5 DivPrice'><span className='PriceBadge m-2 '>{tovar.price} RUB</span></div>
                            <div className='ProdInfLine'><hr className = 'lineOnTovar' /></div> 
                            <div  className='DivShortAbout mb-4'><span className='ShortAbout'>{tovar.shortAbout} </span></div>
                            <div  className='DivShortAbout'><span className='ShortAbout'>{tovar.dimensions} </span></div>
                            <Row xs = {1} sm ={1} md = {1} lg={2} xl={2} className='RowCountAndCart'> 
                                <Col className='mt-4' xl = {4} lg ={4}>
                                    <span className = 'Counter'> 
                                        <button  className='minusButton' onClick = {(e) => {setCount(Count-1)}}>-</button> 
                                        <input type='number' className='InputNumber' value = {Count} onChange = {(e) => {setCount(e.target.value)}}/> 
                                        <button  className='plusButton' onClick = {(e) => {setCount(Count+1)}}>+</button>
                                    </span>
                                </Col>
                                <Col>
                                    <button className='AddToCartButt mt-4' onClick= {AddToCart}>Добавить в корзину</button>
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        <Row>
                        <Col><div className = 'ProdNameDiv mt-5' >
                        <span className = 'ProdName'>Рекомендации к покупке</span>
                    </div>
                    </Col>
                    </Row>
                    <Row>
                        {
                        catalog.slice(recomendation-4, recomendation).map((el, key) => (
                                <Col className='mb-3 mt-3 colCard' xs={6} sm ={6} md = {6} lg={3} xl={3}> 
                                    <Card onClick = {(e) => {setTimedId(el.id)}}>
                                    <Card.Img variant="top" src={el.mainImage} />
                                    <Card.Body>
                                        <Card.Title className='text-center'>
                                            {el.Name}<br/><br/>
                                            <span className='AddToCartButt'>{el.price}p</span>
                                            </Card.Title>  
                                    </Card.Body>
                                    </Card> 
                                </Col>
                        ))   
                        }
                    </Row>
                </Container>
                            


                
            </div>
        )
    }


}