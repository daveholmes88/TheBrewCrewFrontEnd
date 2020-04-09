import React, { Component } from 'react'

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
                this.props.loginUser({id: data.id, username: data.username})
                localStorage.setItem('token', data.token)
                this.props.history.push('/home')
            })
            .catch(err => console.log(err))
            

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Username:</label>
                    <input onChange={this.changeUsername} type="text" value={this.state.username}></input>
                    <input type='password' onChange={this.changePassword} value={this.state.password}></input>
                    <input type='submit' value='Login'/>
                </form>
            </div>
        )
    }
}

export default Login