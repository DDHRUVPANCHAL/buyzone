import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🧮 Calculate total
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // 📦 Load cart on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // ❌ Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    toast.info("🗑️ Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // ➕ Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    toast.success("⬆️ Quantity increased", {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
    });
  };

  // ➖ Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    toast.info("⬇️ Quantity decreased", {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
    });
  };

  return (
    <Container>
      <h2 className="my-3">🛒 Your Cart</h2>
      <Row>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Col xs={12} md={6} lg={4} xl={3} key={index}>
              <Card className="my-2 shadow-sm">
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center mb-2">
                    <ButtonGroup>
                      <Button
                        variant="secondary"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </Button>
                      <Button variant="light" disabled>
                        {item.quantity}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </div>

                  <Card.Text>
                    <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                  </Card.Text>

                  <Button
                    variant="danger"
                    onClick={() => removeItem(item.id)}
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center my-4">
            <h4>No items in cart</h4>
            <Link to="/products">
              <Button variant="primary" className="my-3">
                Add Items
              </Button>
            </Link>
          </div>
        )}
      </Row>

      {cart.length > 0 && (
        <div className="my-4 text-center">
          <h3>🧾 Cart Total: ${total.toFixed(2)}</h3>
          <Link to={"/checkout"}>
            <Button variant="success" size="lg">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Cart;
