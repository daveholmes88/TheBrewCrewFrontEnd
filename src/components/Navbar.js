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

    filterBreweries = () => {
        if (this.props.breweries) {
        const names = this.props.breweries.map(brewery => brewery.name)
        return names.filter(brewery => {
            return brewery.includes(this.state.brewerySearch)
        })}
    }

    render() {
        return (
            <Navbar sticky='top' bg='warning' variant='warning'>
                <Container>
                    <Nav>
                        <Nav.Item>
                            <h3 class='text-primary'>Hops Along</h3>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Near Me</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/search">Search</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link href="/home">Your Breweries</Nav.Link>
                        </Nav.Item>
                        <Typeahead
                            id='search-bar'
                            ref="type"
                            minLength={3}
                            onChange={this.handleSubmit}
                            options={this.filterBreweries()}
                            placeholder="Search Brewery Name"
                        />
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