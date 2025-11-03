import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  // 📦 Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // 🗑️ Clear all orders
  const clearOrders = () => {
    if (orders.length === 0) {
      toast.info("No orders to clear");
      return;
    }

    if (window.confirm("Are you sure you want to clear all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
      toast.success("All orders cleared successfully!");
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">📦 My Orders</h2>

        {orders.length > 0 && (
          <Button variant="danger" onClick={clearOrders}>
            🗑️ Clear All Orders
          </Button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center my-5">
          <h4>You haven't placed any orders yet.</h4>
          <Link to="/products">
            <Button variant="primary" className="mt-3">
              Shop Now
            </Button>
          </Link>
        </div>
      ) : (
        <Row>
          {orders.map((order, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>🧾 Order #{index + 1}</Card.Title>
                  <Card.Text>
                    <strong>Customer:</strong> {order.userDetails.name}
                    <br />
                    <strong>Email:</strong> {order.userDetails.email}
                    <br />
                    <strong>Address:</strong> {order.userDetails.address},{" "}
                    {order.userDetails.city} - {order.userDetails.pincode}
                    <br />
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleString()}
                  </Card.Text>

                  <hr />

                  <h6>🛍️ Items:</h6>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between small mb-1"
                    >
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <hr />
                  <h5>Total: ${order.total.toFixed(2)}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Orders;
