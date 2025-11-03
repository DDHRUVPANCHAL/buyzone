import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Productdetails() {

  let [productdetails, setProductdetails] = useState({});
  let [quantity, setQuantity] = useState(0);

  let navigate = useNavigate();

  let id = useLocation().pathname.split("/")[2]

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
      console.log(response);
      setProductdetails(response.data);
    })
  }, [])

  function IncQty() {
    if (quantity >= 0) {
      setQuantity(quantity + 1)
      // toast.success("Item added")
    }
    if (quantity >= 5) {
      setQuantity(quantity)
      toast.error("Max Quantity limit reached")
    }
  }

  function DecQty() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      // toast.success("Item Removed")
    }
  }

  function addToCart() {
    if (quantity <= 0) {
      toast.error("Please select at least 1 quantity");
      return;
    }

    // Get existing cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.id === productdetails.id);

    if (existingProduct) {
      existingProduct.quantity += quantity; // update qty
    } else {
      cart.push({
        id: productdetails.id,
        title: productdetails.title,
        price: productdetails.price,
        image: productdetails.images?.[0],
        quantity: quantity
      });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(
      <div>
        <h6 style={{display:"inline"}} className='mx-2'>Item Added to Cart</h6>
        <Link to={"/cart"}><Button variant='success'>View Cart</Button></Link>
      </div>, {});
    // navigate("/cart"); // redirect to cart page
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Card.Img variant="top" src={productdetails.images?.[0]} />
          </Col>
          <Col xs={12} md={6}>
            <Card className='my-3'>
              <Card.Body>
                <Card.Title>{productdetails.id}. {productdetails.title}</Card.Title>
                {(() => {
                  if (productdetails.brand) {
                    return (
                      <>
                        <Card.Text>
                          <span>Brand : <b> {productdetails.brand}</b> </span>
                        </Card.Text>
                      </>
                    )
                  }
                })()}
                <Card.Text>
                  {productdetails.description}
                </Card.Text>
                <Card.Text>
                  <span>Price : <b>${productdetails.price}</b></span>
                </Card.Text>
                <Card.Text>
                  <span>Rating : <b>{productdetails.rating}/5</b></span>
                </Card.Text>
                <Card.Text>
                  <span className='me-3'>Qty :  {quantity}<Button variant="primary" className='mx-3' onClick={IncQty}><i className="fa-solid fa-plus"></i></Button> <Button variant="primary" onClick={DecQty}><i className="fa-solid fa-minus"></i></Button></span>
                </Card.Text>
                <Card.Text>
                  <span>Total Price : <b>${(productdetails.price * quantity).toFixed(2)}</b></span>
                </Card.Text>
                <Link to={`/shop/${id}`}>
                  <Button variant="primary">Buy Now</Button>
                </Link>
                {/* <Link> */}
                <Button onClick={addToCart} variant="primary" className='mx-3'>Add to Cart</Button>
                {/* </Link> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Productdetails;
