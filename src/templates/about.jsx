import {Container, Row, Col } from 'react-bootstrap'

function About() {
    return (
        <div className='my-4'>
            <h1 className='text-center mb-5'>About us</h1>
            <Container>
                <Row>
                    <Col className='d-flex my-3 justify-content-center align-items-center'>
                        <img width={"400px"} src="https://www.bhg.com/thmb/NbQEoa7iBLq_T5rIvYCzhlDaxLI=/6720x0/filters:no_upscale():strip_icc()/GettyImages-871227828-3834df77f19b4cef8a2fe9dbc0dd8df6.jpg" alt="" />
                    </Col>
                    <Col className='d-flex flex-column justify-content-center align-items-center my-3'>
                        <h3><u>Buy Zone</u></h3>
                        <h4> BuyZone is your ultimate online shopping destination for trendy fashion, electronics, and home essentials. Enjoy unbeatable deals, secure payments, and fast delivery—all in one place. Discover, shop, and save effortlessly with BuyZone, where smart shopping begins!</h4>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About
