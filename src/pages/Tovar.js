import React, {useEffect, useState, useContext} from 'react'
import { Container,Row,Col,Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { UserContext } from "../App";
import { useAlert } from "react-alert";


export default function Tovar(props) {
    const id = props.match.params.id;
    const { userCart, setUserCart } = useContext(UserContext)
    const { filesPortret, setFilesPortret } = useContext(UserContext)
    const [Count, setCount] = useState(1)
    const [itemList, setItemList] = useState()
    const [tovar, setTovar] = useState([])
    const alert = useAlert();
    const history = useHistory();
    
    useEffect(() => {
        var form = new FormData()
        form.append('JSONPARSE',true);
        fetch("http://g908020p.beget.tech",{
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        .then(response => {
            var json = JSON.parse(response)
            setItemList(json.items)
            console.log(json.items)
            json.items.find((e) => {
                if(e.id == id && tovar ==''){
                    setTovar(e)
                    return 
                }
            })
        })
    }, [])

    if (Count > 10){
        setCount(10)
    }else if(Count < 1){
        setCount(1)
    }

    const AddToCart = (e) => {
        setUserCart((p) => ({ ...p, cart:[ ...userCart.cart , [tovar.id , Count]] }))
        setFilesPortret((p) => ({ ...p, filesPortret:[ ...filesPortret.filesPortret , ['notFile']] }))
        alert.success('Товар успешно добавлен в корзину');
    }


    if(tovar != ''){
    return (
        <div className='MarginTop mb-3'>
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
                                            src = {'http://g908020p.beget.tech/images/'+im}
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
                        
                </Container>
        </div>
    )
}else{
    return(<></>)
}
}
