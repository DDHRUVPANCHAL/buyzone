import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🧾 Load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
        const totalAmount = savedCart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(totalAmount);
    }, []);

    // 📝 Handle input changes
    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    // ✅ Validate checkout form
    const validateForm = () => {
        const { name, email, address, city, pincode } = userDetails;

        if (!name || !email || !address || !city || !pincode) {
            toast.error("Please fill in all required fields");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");
            return false;
        }

        if (pincode.length !== 6 || isNaN(pincode)) {
            toast.error("Enter a valid 6-digit pincode");
            return false;
        }

        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return false;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return false;
        }

        return true;
    };

    // 💳 Handle Checkout
    const handleCheckout = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            if (paymentMethod === "online") {
                toast.info("Redirecting to secure payment gateway...");
                await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
            }

            // simulate order confirmation
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // ✅ Save placed order to localStorage
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const newOrder = {
                items: cart,
                total,
                userDetails,
                paymentMethod,
                date: new Date().toISOString(),
            };
            savedOrders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(savedOrders));

            // clear cart after placing order
            localStorage.removeItem("cart");
            setCart([]);
            toast.success("✅ Order placed successfully!");
            navigate("/orders");

        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center">Checkout</h2>
            <Row>
                {/* Left side: Billing Details */}
                <Col md={6}>
                    <Card className="p-4 shadow-sm mb-4">
                        <h5>Billing Details</h5>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter full name"
                                    value={userDetails.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={userDetails.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter full address"
                                    value={userDetails.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            placeholder="Enter city"
                                            value={userDetails.city}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pincode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pincode"
                                            placeholder="Enter pincode"
                                            value={userDetails.pincode}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    {/* Payment Method */}
                    <Card className="p-4 shadow-sm">
                        <h5>Select Payment Method</h5>
                        <Form.Check
                            type="radio"
                            label="Cash on Delivery (COD)"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mb-2"
                        />
                        <Form.Check
                            type="radio"
                            label="Online Payment"
                            name="payment"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Card>
                </Col>

                {/* Right side: Order Summary */}
                <Col md={6}>
                    <Card className="p-4 shadow-sm">
                        <h5 className="mb-3">Order Summary</h5>
                        {cart.length === 0 ? (
                            <p>No items in cart</p>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex justify-content-between mb-2"
                                    >
                                        <span>
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}

                                <hr />
                                <h5>Total: ${total.toFixed(2)}</h5>

                                <Button
                                    variant="success"
                                    className="w-100 mt-3"
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "Place Order"}
                                </Button>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;
