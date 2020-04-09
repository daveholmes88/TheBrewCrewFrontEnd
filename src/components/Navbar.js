import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import { Navbar } from 'react-bootstrap'

class BrewNavbar extends React.Component {

    render() {
        return (
            <Navbar bg='dark' variant='dark'>
            <Nav className='mr-auto'>
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/nearme">Near Me</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/search">Search</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link href='/login'><button onClick={this.props.handleLogout} >
                        {localStorage.token ? "Logout" : "Login"}
                    </button>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar>
        )
    }
}

export default BrewNavbar