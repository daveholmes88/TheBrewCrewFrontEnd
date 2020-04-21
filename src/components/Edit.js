import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

class Edit extends Component {

    componentDidMount() {
        if (!localStorage.token) {
            this.props.history.push('/login')
        }
    }

    render() {
        const { brewery } = this.props
        return(     
        <Container>
            <Form onChange={this.props.handleEditChange}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Brewery Name" value={brewery.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control name='brewery_type' type="text" placeholder="Brewery Type" value={brewery.brewery_type}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control name='address' type="text" placeholder="Brewery Address" value={brewery.address} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control name='city' type="text" placeholder="Brewery City" value={brewery.city} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control name='state' type="text" placeholder="Brewery State" value={brewery.state} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control name='zip_code' type="text" placeholder="Brewery Zip" value={brewery.zip}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control name='country' type="text" placeholder="Brewery Country" value={brewery.country}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control name='website'type="text" placeholder="Brewery Website" value={brewery.website}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name='phone' type="text" placeholder="Brewery Phone Number" value={brewery.phone}/>
                </Form.Group>
                <Button onClick={this.props.editSubmit} variant="primary" type="submit">
                    Edit Brewery
                </Button>
            </Form>
        </Container>
    )
    }
}

export default Edit