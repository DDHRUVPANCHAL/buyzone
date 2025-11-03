import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar, Form, Offcanvas } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function HandleInput(e) {
        setQuery(e.target.value);
    }

    function HandleSubmit(e) {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    }

    useEffect(() => {
        axios.get('https://dummyjson.com/products/category-list').then((response) => {
            setCategories(response.data);
        });
    }, []);

    return (
        <Navbar expand="lg" style={{ backgroundColor: "var(--primary)" }}>
            <Container fluid>
                <img
                    width={"50px"}
                    className="me-3"
                    src="https://cdn-icons-png.flaticon.com/512/3225/3225194.png"
                    alt="BuyZone Logo"
                />

                {/* ✅ Fixed Navbar.Brand */}
                <Navbar.Brand as={Link} to="/">BuyZone</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        {/* ✅ Fixed all Nav.Links */}
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

                        {/* ✅ Fixed NavDropdown links */}
                        <NavDropdown title="More" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about">About Us</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/location">
                                Where we are!
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/* Search Bar */}
                    <Form className="d-flex" onSubmit={HandleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search Products"
                            className="me-2"
                            aria-label="Search"
                            onInput={HandleInput}
                        />
                        <Button variant="success" className="mx-2">Search</Button>
                    </Form>

                    {/* Categories Button + Offcanvas */}
                    <Button variant="primary" onClick={handleShow}>Categories</Button>

                    <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: "black", color: "white" }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Categories</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul>
                                {categories.map((value, index) => (
                                    <React.Fragment key={index}>
                                        <Link
                                            onClick={handleClose}
                                            to={`/productbycategory/${value}`}
                                            className="category text-white text-decoration-none"
                                        >
                                            <li className="my-3">{value}</li>
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
