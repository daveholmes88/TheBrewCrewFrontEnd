import React, { Component } from 'react';
import StarRating from './StarRating.jsx';
import ReactMapGL, { Marker, Popup, CanvasOverlay } from "react-map-gl";
import { Card, Button, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BreweryShow extends Component {

    constructor() {
        super()
        this.state = {
            viewport: {},
            selected: false
        }
    }

    breweryRating = () => {
        const breweryRatings = this.props.ratings.filter(rating => {
            return rating.brewery_id === this.props.brewery.id
        })
        const allNumbers = breweryRatings.map(rating => rating.number)
        const averageRating = allNumbers.reduce((a, b) => a + b, 0) / allNumbers.length
        return averageRating
    }

    componentDidMount() {
        if (this.props.brewery.name) {
            this.setState({
                viewport: { longitude: this.props.brewery.longitude, latitude: this.props.brewery.latitude, zoom: 13 },
            })
        } else {
            this.props.history.push('/')
        }
    }

    handleEdit = () => {
        this.props.handleEdit(this.props.brewery)
    }

    handleClick = () => {
        this.setState({
            selected: true
        })
    }

    createLink = () => {
        const breweryName = this.props.brewery.name.replace(/ /g, "+")
        const linkString = breweryName.concat(`+${this.props.brewery.city}`)
        return `https://google.com/maps/place/${linkString}`
    }

    phonebrewery = phone => {
        let phoneArray = phone.split('')
        phoneArray.unshift('(')
        phoneArray.splice(4, 0, ')')
        phoneArray.splice(8, 0, '-')
        return < Card.Text class='text-center' > {phoneArray}</Card.Text >
    }

    render() {
        const { brewery } = this.props
        console.log(brewery)
        const mapboxToken = process.env.REACT_APP_MapboxToken
        return (
            <Container>
                <Row sm={2}>
                    <Col>
                        <ReactMapGL {...this.state.viewport}
                            mapboxApiAccessToken={mapboxToken}
                            mapStyle='mapbox://styles/daveholmes88/ck8yhbgr259vz1itbn285ffo0'
                            width="100%"
                            height="140%"
                            onViewportChange={viewport => this.setState({ viewport })}>
                            <Marker key={brewery.id} longitude={parseFloat(brewery.longitude)} latitude={parseFloat(brewery.latitude)} >
                                <button class='marker-btn' onClick={this.handleClick}>
                                    <img src='../../beer-mug.png' alt='brewery icon' />
                                </button>
                            </Marker>
                            {this.state.selected ?
                                <Popup
                                    latitude={brewery.latitude}
                                    longitude={brewery.longitude}
                                    onClose={() => this.setState({ selected: false })}>
                                    {brewery.name}
                                </Popup> : null}
                        </ReactMapGL>
                    </Col>
                    <Col>
                        <Card border='warning'>
                            <Card.Body className='text-center'>
                                <Card.Title><h1>{brewery.name}</h1></Card.Title>
                                <Card.Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Card.Text>
                                <a href={brewery.website} target='_blank' rel='noopener noreferrer'>{brewery.name}'s Website</a>
                                {brewery.phone ? this.phonebrewery(brewery.phone) : null}
                                {this.breweryRating() ? <p>Global Rating: {this.breweryRating()}</p> : null}
                                <Form>
                                    <Form.Group className="form-input rating">
                                        <Form.Label htmlFor="rating">Your Rating:</Form.Label>
                                        <StarRating
                                            numberOfStars="5"
                                            currentRating={this.props.number}
                                            onClick={this.props.setRating}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-input">
                                        <Form.Label htmlFor="description"></Form.Label>
                                        <textarea
                                            name="notes"
                                            id="notes"
                                            onChange={this.props.noteChange}
                                            value={this.props.notes}
                                        />
                                    </Form.Group>
                                    <Form.Group className="actions">
                                        <Button type="submit" onClick={this.props.saveRating} variant='primary'>
                                            Submit Rating
                                        </Button>
                                    </Form.Group>
                                </Form>
                                {this.props.ratingAlert ? <Alert variant='warning'>You must be logged in and rate a brewery to save.</Alert> : null}
                                <br></br>
                                <Link to='/edit'>
                                    <Button onClick={this.handleEdit}>Edit Brewery</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BreweryShow