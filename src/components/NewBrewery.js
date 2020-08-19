import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { config } from "../Constants";

const API_AdminNew = config.url.API_AdminNew

class NewBrewery extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            kind: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            website: '',
            phone_number: ''
        }
    }

    componentDidMount() {
        if (!localStorage.token) {
            this.props.history.push('/login')
        }
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault()
        const newBrewery = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        fetch(API_AdminNew, newBrewery)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                // this.props.breweryShow(data)
                // this.props.history.push('/show')
            })
    }

    render() {
        console.log(this.props.user)
        return (
            <div class='container'>
                <Form onChange={this.onChange}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type="text" placeholder="Brewery Name" value={this.state.name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control name='kind' type="text" placeholder="Brewery Type" value={this.state.kind} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name='address' type="text" placeholder="Brewery Address" value={this.state.address} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control name='city' type="text" placeholder="Brewery City" value={this.state.city} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control name='state' type="text" placeholder="Brewery State" value={this.state.state} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control name='zip_code' type="text" placeholder="Brewery Zip" value={this.state.zip_code} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control name='country' type="text" placeholder="Brewery Country" value={this.state.country} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website</Form.Label>
                        <Form.Control name='website' type="text" placeholder="Brewery Website" value={this.state.website} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name='phone_number' type="text" placeholder="Brewery Phone Number" value={this.state.phone_number} />
                    </Form.Group>
                    <Button onClick={this.onSubmit} variant="primary" type="submit">
                        Add Brewery
                    </Button>
                </Form>
            </div>
        )
    }
}

export default NewBrewery