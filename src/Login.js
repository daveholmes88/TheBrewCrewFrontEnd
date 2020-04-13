import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: 'bigdave',
            password: 'yodajams'
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
                    alert(`${data.error}`)
                } else {
                this.props.loginUser({id: data.id, username: data.username})
                localStorage.setItem('token', data.token)
                this.props.history.push('/home')
                }
            })
            .catch(err => console.log(err))
            

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={this.changeUsername} value={this.state.username} />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login