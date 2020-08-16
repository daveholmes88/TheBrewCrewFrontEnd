import React, { Component } from 'react'
import { Form, Button, Alert, Container, Row, Col, } from 'react-bootstrap'

import { config } from "../Constants";

const API_Users = config.url.API_Users

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            alert: false,
            signup: false
        }
    }

    changeUsername = event => {
        this.setState({
            username: event.target.value
        })
    }

    changePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmitLogin = event => {
        event.preventDefault()
        const reqUser = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }
        fetch(`${API_Users}/1`, reqUser)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: true
                    })
                } else {
                    this.props.loginUser({ id: data.id, username: data.username, admin: data.admin })
                    localStorage.setItem('token', data.token)
                    this.props.history.push('/')
                }
            })
            .catch(err => console.log(err))
    }

    signUpState = () => {
        this.setState({
            signup: !this.state.signup
        })
    }

    changeEmail = event => {
        this.setState({
            email: event.target.value
        })
    }

    onSubmitSignup = event => {
        event.preventDefault()
        const reqUser = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        }
        fetch(API_Users, reqUser)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    this.setState({
                        alert: true
                    })
                } else {
                    this.props.loginUser({ id: data.id, username: data.username, admin: data.admin })
                    localStorage.setItem('token', data.token)
                    this.props.history.push('/')
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <Row md={2}>
                    {!this.state.signup ? <Col>
                        <br></br>
                        <h2 class='text-primary'>LOGIN</h2>
                        <h5>Not a user? <Button onClick={this.signUpState}>Sign Up</Button></h5>
                        <Form onSubmit={this.onSubmitLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label class='text-primary'>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label class='text-primary'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onChange={this.changePassword} value={this.state.password} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                        {this.state.alert ? <Alert key='1' variant='warning'>Invalid Sign-in Credentials</Alert> : null}
                    </Col> : <Col>
                            <br></br>
                            <h2 class='text-primary'>SIGN UP</h2>
                            <h5>Already a user? <Button onClick={this.signUpState}>Login</Button></h5>
                            <Form onSubmit={this.onSubmitSignup}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label class='text-primary'>Email:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Email" onChange={this.changeEmail} value={this.state.email} />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label class='text-primary'>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label class='text-primary'>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" onChange={this.changePassword} value={this.state.password} />
                                </Form.Group>
                                <Button variant="primary" type="submit">Sign Up</Button>
                            </Form>
                            {this.state.alert ? <Alert key='1' variant='warning'>Invalid Sign-up Credentials</Alert> : null}
                        </Col>}
                </Row>
            </Container>
        )
    }
}

export default Login