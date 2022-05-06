import React, {useEffect, useState} from 'react'
import { Container,Row,Col,Card,Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";



function ItemList() {
    const [catalog, setCatalog] = useState([])
    const [loading, setLoading] = useState(false)

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
            setCatalog(json)
            setLoading(true)
            console.log(json)

        })
        .catch(error => {
            console.log(error)
        })

     }, [])

if (loading == false){
    return(
    <div className='MarginTop mb-4'>
    <Container>
        <Row> 
            <Col>
                <div className = 'ProdNameDiv mb-2' >
                    <span className = 'ProdName'>Наши товары</span> <br/><br/><br/> <br/>
                    <div class="loadingio-spinner-dual-ring-0i3eilzu4zqn"><div class="ldio-wr6v1tla7ab"><div></div><div><div></div></div></div></div>

                </div>
            </Col>
        </Row>

        </Container>
       </div>
   )
}else if(loading == true){
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
                                            <Card.Img variant="top" src = {'http://g908020p.beget.tech/images/'+el.mainImage} />
                                            <Card.Body>
                                                <Card.Title className='allLinks2'>{el.name}<span className='priceSpan'>{el.price}p</span></Card.Title>  
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
}}

export default ItemList;