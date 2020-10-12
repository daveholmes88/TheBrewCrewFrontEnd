import React, { Component } from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com';

class ContactUs extends Component {
    constructor() {
        super()
        this.state = {
            sent: false,
            alert: false
        }
    }

    sendEmail = event => {
        event.preventDefault()
        debugger
        if (event.target.email.value === '') {
            this.setState({ alert: true })
        } else {
            emailjs.sendForm('service_40x8ha7', 'template_igx7gya', event.target, 'user_xgEWHOpo8SAXdH4US6oo3')
                .then((result) => {
                    console.log(result.text);
                    this.setState({ sent: true })
                }, (error) => {
                    console.log(error.text);
                });
        }
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
                        {this.state.sent ? <h3>Your message has been successfully sent. Dave, the creator of Hops Along, will be getting in touch with you shortly.</h3>
                            : <Form onSubmit={this.sendEmail}>
                                <Form.Group>
                                    <Form.Label class='text-primary'>Name:</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="Name" />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label class='text-primary'>Email:</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="name@email.com" />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label class='text-primary'>Message:</Form.Label>
                                    <Form.Control name="message" as="textarea" rows="5" placeholder="Send us a message" />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">Send</Button>
                            </Form>}
                        {this.state.alert ? <Alert variant='warning'>Email field can not be left blank</Alert> : null}
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default ContactUs