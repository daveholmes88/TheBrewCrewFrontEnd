import React, { Component } from 'react'; 
import { Form, Button } from 'react-bootstrap';

class NewBrewery extends Component {
    constructor() {
        super()
        this.state = {
            name: 'Bobbing Bobber Brewing Company',
            kind: 'micro', 
            address: '900 MN-15', 
            city: 'Hutchinson', 
            state: 'Minnesota',
            zip_code: '55350', 
            country: 'United States', 
            website: 'https://www.bobbingbobber.com/', 
            phone_number: '3204554999' 
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
        fetch('http://localhost:3000/breweries', newBrewery)
            .then(resp => resp.json())
            .then(data => {
                this.props.breweryShow(data)
                this.props.history.push('/show')
            })
    }

    componentDidMount() {
        if (!localStorage.token) {
            this.props.history.push('/login')
        }
    }

    render() {
        return(
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
                        <Form.Control name='zip_code' type="text" placeholder="Brewery Zip" value={this.state.zip_code}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control name='country' type="text" placeholder="Brewery Country" value={this.state.country} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website</Form.Label>
                        <Form.Control name='website'type="text" placeholder="Brewery Website" value={this.state.website}/>
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