import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar, Form, Offcanvas } from 'react-bootstrap'
import { useNavigate , Link} from 'react-router-dom';

function Header() {

    let [query, setQuery] = useState("");
    let [categories, setCategories] = useState([]);

    let navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function HandleInput(e) {
        console.log(e.target.value);
        setQuery(e.target.value)
    }

    function HandleSubmit(e) {
        e.preventDefault();
        navigate(`/search?query=${query}`)
    }

    useEffect(() => {
        axios.get('https://dummyjson.com/products/category-list').then((response) => {
            console.log(response);
            setCategories(response.data)
        })
    }, [])

    return (
        <div>
            <Navbar expand="lg" className="" style={{ backgroundColor: "var(--primary)" }}>
                <Container fluid>
                    <img width={"50px"} className='me-3' src="https://cdn-icons-png.flaticon.com/512/3225/3225194.png" alt="" />
                    <Navbar.Brand to="/">BuyZone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link to="/products">Products</Nav.Link>
                            <Nav.Link to="/">Home</Nav.Link>
                            <Nav.Link to="/cart">Cart</Nav.Link>
                            <Nav.Link to="/orders">Orders</Nav.Link>
                            <NavDropdown title="More" id="navbarScrollingDropdown">
                                <NavDropdown.Item to="/contact">Contact</NavDropdown.Item>
                                <NavDropdown.Item to="/about">
                                    About Us
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/location">
                                    Where we are!
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" onSubmit={HandleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search Products"
                                className="me-2"
                                aria-label="Search"
                                onInput={HandleInput}
                            />
                            <Button variant="success" className='mx-2'>Search</Button>
                        </Form>

                        <Button variant="primary" onClick={handleShow}>
                            Categories
                        </Button>

                        <Offcanvas show={show} onHide={handleClose} style={{backgroundColor:"black",color:"white"}}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Categories</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body >
                                <ul>
                                    {categories.map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Link onClick={handleClose} to={`/productbycategory/${value}`} className='category'><li className='my-3'>{value}</li></Link>
                                            </React.Fragment>
                                        )
                                    })}
                                </ul>
                            </Offcanvas.Body>
                        </Offcanvas>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
