import React, {useEffect, useState} from 'react'
import itemList from '../catalog.json'
import { Container,Row,Col,Card,Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";




function ItemList() {
    const [catalog, setCatalog] = useState([])
    useEffect(() => {
       setCatalog(itemList.items)
    }, [])

   return (
       <div className='MarginTop mb-4'>
            <Container>
                <Row> 
                    <Col>
                        <div className = 'ProdNameDiv mb-2' >
                            <span className = 'ProdName'>Наши товары</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        catalog.map(el => (
                            <Col className='mb-3 mt-3 colCard' sm ={12} md = {6} lg={4} xl={4}> 
                             <LinkContainer to={`/Tovar/${el.id}`}>
                                 <Nav.Link >
                                        <Card >
                                            <Card.Img variant="top" src={el.mainImage} />
                                            <Card.Body>
                                                <Card.Title className='allLinks2'>{el.Name}<span className='priceSpan'>{el.price}p</span></Card.Title>  
                                            </Card.Body>
                                        </Card> 
                                </Nav.Link>
                            </LinkContainer>
                            </Col>
                        ))   
                    }
                </Row>
            </Container>
       </div>
   )
}

export default ItemList;