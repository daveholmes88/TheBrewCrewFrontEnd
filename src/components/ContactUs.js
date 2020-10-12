import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';

class ContactUs extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            message: '',
            // sent: false
        }
    }

    sendEmail = () => {
        emailjs.sendForm('service_40x8ha7', 'template_igx7gya', this.state, 'user_xgEWHOpo8SAXdH4US6oo3')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <Container>
                <Row xs={1} sm={1} md={2}>
                    <Col>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h1>Contact Us</h1>
                        <h3>If you have any questions about Hops Along feel free to contact us and we'll be with you as soon as we can.</h3>
                    </Col>
                    <Col>
                        <br></br>
                        <br></br>
                        <Form onChange={this.onChange}>
                            <Form.Group>
                                <Form.Label class='text-primary'>Name:</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Name" value={this.state.name} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label class='text-primary'>Email:</Form.Label>
                                <Form.Control name="email" type="email" placeholder="name@email.com" value={this.state.email} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label class='text-primary'>Message:</Form.Label>
                                <Form.Control name="message" as="textarea" rows="5" placeholder="Send us a message" value={this.state.message} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.sendEmail}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default ContactUs