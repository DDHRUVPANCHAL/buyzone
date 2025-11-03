import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Products() {

    let [products, setProducts] = useState([]);
    let [loader, setLoader] = useState(true);

    async function Fetch_Products() {
        try {
            await axios.get('https://dummyjson.com/products?limit=200').then((response) => {
                console.log(response.data);
                setProducts(response.data.products)
            })
        } catch (e) {
            console.log(e);
        } finally {
            setLoader(false);
        }
    }

    async function Sort(e) {

        let sort_value = e.target.value;
        console.log(sort_value);

        if (sort_value == 'asc' || sort_value == "desc") {
            try {
                await axios.get(`https://dummyjson.com/products?sortBy=title&order=${sort_value}`).then((response) => {
                    console.log(response.data);
                    setProducts(response.data.products)
                })
            } catch (e) {
                console.log(e);
            } finally {
                setLoader(false);
            }
        } else {
            try {
                await axios.get('https://dummyjson.com/products?limit=200').then((response) => {
                    console.log(response.data);
                    setProducts(response.data.products)
                })
            } catch (e) {
                console.log(e);
            } finally {
                setLoader(false);
            }
        }
    }

    useEffect(() => {
        Fetch_Products();
    }, [])

    if (loader) {
        return (
            <>
                <div style={{ backgroundColor: "black", height: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Please Wait...</h1>
                </div>
            </>
        )
    }

    return (
        <div>
            <Container>
                <h1 className='my-3 text-center'>ALL PRODUCTS</h1>
                <select className='sorting p-2 rounded' onChange={Sort} defaultValue={"sort"}>
                    <option value="sort">SORT</option>
                    <option value="asc">SORT ASCENDING</option>
                    <option value="desc">SORT DESCENDING</option>
                </select>
                <Row>
                    {products.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Col xs={12} sm={6} lg={4} xl={3}>
                                    <Card className='my-3' style={{ backgroundColor: "var(--primary)", color: "var(--quaternary)" }}>
                                        <Card.Img variant="top" src={value.images[0]} />
                                        <Card.Body>
                                            <Card.Title>{index + 1}. {value.title}</Card.Title>
                                            <Card.Text>
                                                {/* {value.description} */}
                                            </Card.Text>
                                            <Link to={`/productdetails/${value.id}`}>
                                                <Button variant="primary">Learn More</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Products;
