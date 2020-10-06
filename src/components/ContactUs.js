import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap';

class ContactUs extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            message: '',
            sent: false
        }
    }

    render() {
        return (
            <Container>
                <Container>
                    <h1>Contact Us</h1>
                    <h3>If you have any questions about Hops Along feel free to contact us and we'll be with you as soon as we can.</h3>
                </Container>
                <Form></Form>
            </Container>
        )
    }
}

export default ContactUs