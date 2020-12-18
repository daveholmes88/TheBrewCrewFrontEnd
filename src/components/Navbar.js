import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'

class BrewNavbar extends React.Component {
    constructor() {
        super()
        this.state = {
            brewerySearch: ''
        }
    }

    handleSubmit = event => {
        const name = event[0]
        const brewery = this.props.breweries.filter(brewery => name === brewery.name)
        this.refs.type.getInstance().clear()
        this.props.breweryShow(brewery[0])
    }

    searchBreweries = () => {
        return this.props.breweries.map(brewery => brewery.name)
    }

    render() {
        return (
            <Navbar collapseOnSelect expand='sm' sticky='top' bg='warning'>
                <Container>
                    <Navbar.Brand href='/'><h2 className='text-primary'>Hops Along</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className='mr-auto'>
                            <Nav.Item>
                                <Nav.Link href="/search" className='text-primary'>Search</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/home" className='text-primary'>Your Breweries</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contact" className='text-primary'>Contact</Nav.Link>
                            </Nav.Item>
                            <Typeahead
                                id='search-bar'
                                ref="type"
                                minLength={3}
                                onChange={this.handleSubmit}
                                options={this.searchBreweries}
                                placeholder="Search Brewery Name"
                            />
                            {this.props.user.admin ? <Nav.Item>
                                <Nav.Link href="/Admin" className='text-primary'>Admin</Nav.Link>
                            </Nav.Item> : null}
                        </Nav>
                        <Nav>
                            <Nav.Item >
                                <Nav.Link href='/login'>
                                    <Button bg='warning' variant='outline-primary' onClick={this.props.handleLogout} >
                                        {this.props.user ? "Logout" : "Login"}
                                    </Button>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        )
    }
}

export default BrewNavbar