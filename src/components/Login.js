import React, { Component } from 'react'
import { Form, Button, Alert, Container, Row, Col, } from 'react-bootstrap'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            alert: false
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

    onSubmit = event => {
        event.preventDefault()
        const reqUser = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username, 
                password: this.state.password
            })
        }
        fetch('http://localhost:3000/users', reqUser)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: true
                    })
                } else {
                this.props.loginUser({id: data.id, username: data.username})
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
                    <Col>
                        <br></br>
                        <h2 class='text-primary'>LOGIN/SIGN UP</h2>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label class='text-primary'>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label class='text-primary'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                        {this.state.alert ? <Alert key='1' variant='warning'>Invalid Sign-in Credentials</Alert> : null}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login