import React, { useEffect } from 'react'
import { Container,Row,Col,Tab,Nav  } from 'react-bootstrap';

export default function Test(props) {
        return (
            <>
               <Container>
                    <Row> 
                        <Col></Col>
                        <Col>
                        <iframe className='mt-5' src="https://docs.google.com/forms/d/e/1FAIpQLSds554hAm9_bxQy1eioLQJGjk-HeL9xJDyMxYIaMDWjxGPajQ/viewform?embedded=true" width="640" height="2848" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        )
    }