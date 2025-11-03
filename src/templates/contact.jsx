import { Form, Button,Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useState } from 'react'

function Contact() {

    let [contact, setContact] = useState({
        email: "",
        subject: "",
        message: ""
    })

    function Handleinput(e) {
        console.log(e.target.value);
        const { name, value } = e.target;
        setContact((contact) => ({
            ...contact,
            [name]: value,
        }))
    }

    function Handlecontact(e) {
        e.preventDefault();

        console.log(contact);

        if(!contact.email || !contact.subject || !contact.message) {
            toast.error("All Fields are required",{
                position:"top-right",
                autoClose:1000,
                theme:"colored"
            })
        }
        
        if (contact.email && contact.subject && contact.message) {
            setContact({
                email: "",
                subject: "",
                message: ""
            })
            toast.success("Contact Inquriy Submitted",{
                position:'top-right',
                autoClose:1000,
                theme:"colored"
            })
        }
    }

    return (
        <div>
            <h1 className='text-center my-3'>Contact Us</h1>
            <Container className='my-3'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address *</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onInput={Handleinput} value={contact.email}/>
                        <Form.Text style={{ color: "red" }}>
                            <b>* We'll never share your email with anyone else.</b>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject *</Form.Label>
                        <Form.Control type="text" placeholder="Enter Subject" name='subject' onInput={Handleinput} value={contact.subject}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control type="text" placeholder="Enter Message" name='message' onInput={Handleinput} value={contact.message}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={Handlecontact}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Contact
