import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { Navbar, Button } from 'react-bootstrap'

class BrewNavbar extends React.Component {

    render() {
        return (
            <Navbar sticky='top' bg='warning' variant='warning'>
            <Nav>
                <Nav.Item>
                    <h3 class='text-primary'>The Brew Crew</h3>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Your Breweries</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/nearme">Near Me</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/search">Search</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav className='justify-content-end'>
                <Nav.Item >
                    <Nav.Link href='/login'><Button bg='warning' variant='outline-primary' onClick={this.props.handleLogout} >
                        {localStorage.token ? "Logout" : "Login"}
                    </Button>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar>
        )
    }
}

export default BrewNavbar