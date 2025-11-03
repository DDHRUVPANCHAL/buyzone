import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function Search() {
    const [searchproducts, setSearchproducts] = useState([]);
    const [loader, setLoader] = useState(true);

    const searchQuery = useLocation().search.split('=')[1];
    console.log(searchQuery);

    async function Search_Productfetch() {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products/search?q=${searchQuery}`
            );
            console.log(response);
            setSearchproducts(response.data.products);
        } catch (e) {
            console.log(e);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        Search_Productfetch();
    }, [searchQuery]);

    // 🌀 Loading state
    if (loader) {
        return (
            <div
                style={{
                    backgroundColor: 'black',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                }}
            >
                <h1 style={{ color: 'white', fontFamily: 'cursive' }}>Please Wait ...</h1>
            </div>
        );
    }

    // ❌ No product found
    if (!loader && searchproducts.length === 0) {
        return (
            <Container className="text-center my-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486764.png"
                    alt="No products found"
                    style={{ width: '250px', opacity: 0.8 }}
                />
                <h2
                    className="mt-4"
                    style={{ color: 'red', fontFamily: 'cursive', textTransform: 'capitalize' }}
                >
                    No Products Available for "{searchQuery}"
                </h2>
                <p>Try searching for a different keyword.</p>
            </Container>
        );
    }

    // ✅ Product display
    return (
        <div>
            <Container>
                <h1 className="my-3 text-center" style={{ textTransform: 'uppercase' }}>
                    {searchQuery} KEYWORD RELATED PRODUCTS
                </h1>
                <Row>
                    {searchproducts.map((value, index) => (
                        <Col key={index} xs={12} sm={6} lg={4} xl={3}>
                            <Card
                                className="my-3"
                                style={{ backgroundColor: 'var(--primary)', color: 'var(--quaternary)' }}
                            >
                                <Card.Img variant="top" src={value.images[0]} alt={value.title} />
                                <Card.Body>
                                    <Card.Title>
                                        {index + 1}. {value.title}
                                    </Card.Title>
                                    <Link to={`/productdetails/${value.id}`}>
                                        <Button variant="primary">Learn More</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Search;
