import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import itemList from '../catalog.json'
import { Container,Row,Col,Card } from 'react-bootstrap';




function ItemList(props) {
    const [timedId, setTimedId] = useState(null)
    const [catalog, setCatalog] = useState([])
    const history = useHistory();
    const location = {
        pathname: '/Product',
        state:{
            id: timedId
        }
    }
    useEffect(() => {
       setCatalog(itemList.items)
    }, [])


    
    if (location.state.id === timedId && timedId != null){
        history.push(location)
    }

   return (
       <div className='MarginTop mb-4'>
            <Container>
                <Row>
                    {
                        catalog.map(el => (
                                <Col className='mb-3 mt-3 colCard' sm ={12} md = {6} lg={4} xl={4} onClick = {(e) => {setTimedId(el.id)}}> 
                                    <Card >
                                    <Card.Img variant="top" src={el.mainImage} />
                                    <Card.Body>
                                        <Card.Title>{el.Name}<span className='priceSpan'>{el.price}p</span></Card.Title>  
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

export default ItemList;