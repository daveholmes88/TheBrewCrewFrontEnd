import React, { Component } from 'react';
import BreweryCard from './BreweryCard';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class BrewerySearch extends Component {
    constructor() {
        super()
        this.state = {
            search: null,
            name: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({
            search: event.target.parentElement.location.value.toLowerCase(),
            name: ''
        })
    }

    renderBreweries = () => {
        let searchedBreweries
        if (this.state.search) {
            searchedBreweries = this.props.breweries.filter(brewery => {
                return brewery.city.toLowerCase() === this.state.search || brewery.state.toLowerCase() === this.state.search
            })
        } else {
            searchedBreweries = this.props.breweries.filter(brewery => {
                return brewery.city.toLowerCase() === this.props.search.toLowerCase() || brewery.state.toLowerCase() === this.props.search.toLowerCase()
            })
        }
        if (this.state.name) {
            searchedBreweries = searchedBreweries.filter(brewery => {
                return brewery.name.toLowerCase().includes(this.state.name.toLowerCase())
            })
        }
        return searchedBreweries.map(brewery => {
            return <BreweryCard brewery={brewery}
                key={brewery.id}
                breweryShow={this.props.breweryShow}
                user={this.props.user} />
        })
    }

    handleProps = () => {
        this.setState({
            search: this.props.search
        })
    }

    handleName = event => {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <Container>
                <br></br>
                <Row sm={2}>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Search Location</Form.Label>
                                <Form.Control type='text' placeholder='Enter City OR State' name='location'></Form.Control>
                            </Form.Group>
                            <Button onClick={this.handleSubmit} variant='primary' type='submit' value='Search'>Search</Button>
                        </Form>
                    </Col>
                    {this.state.search || this.props.search ? <Col>
                        <Form>
                            <Form.Label>Filter Results</Form.Label>
                            <Form.Control type='text' placeholder='Brewery Name' onChange={this.handleName} value={this.state.name}></Form.Control>
                        </Form>
                    </Col> : null}
                </Row>
                <br></br>
                <br></br>
                <Row>
                    {this.state.search || this.props.search ? this.renderBreweries() : null}
                </Row>
                <br></br>
                {this.props.user.admin && (this.state.search || this.props.search) ? <h4><Link to='/new'>Create A New Brewery</Link></h4> : null}
            </Container>
        )
    }
}

export default BrewerySearch