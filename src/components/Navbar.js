import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap'

class BrewNavbar extends React.Component {
    constructor() {
        super()
        this.state = {
            brewerySearch: null
        }
    }

    handleInputChange = event => {
        this.setState({
            brewerySearch: event.target.value
        })
    }

    render() {
        return (
            
            <Navbar sticky='top' bg='warning' variant='warning'>
                <Container>
                    <Nav>
                        <Nav.Item>
                            <h3 class='text-primary'>The Brew Crew</h3>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link href="/home">Your Breweries</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Near Me</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/search">Search</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav class='justify-content-end'>
                        <Nav.Item >
                            <Nav.Link href='/login'>
                                <Button bg='warning' variant='outline-primary' onClick={this.props.handleLogout} >
                                    {this.props.user ? "Logout" : "Login"}
                                </Button>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default BrewNavbar