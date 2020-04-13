import React, { Component } from 'react';
import StarRating from './StarRating.jsx';
import ReactMapGL, { Marker } from "react-map-gl";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BreweryShow extends Component {
    
    constructor(){
        super()
        this.state = {
            viewport: {},
            rating: null
        }
    }

    breweryRating = () => {
        const breweryRatings = this.props.ratings.filter(rating => {
            return rating.brewery_id === this.props.brewery.id})
        const allNumbers = breweryRatings.map(rating => rating.number)
        const averageRating = allNumbers.reduce((a,b) => a + b, 0) / allNumbers.length
        return averageRating
    }

    handleRate = () => {
        this.setState({
            rate: !this.state.rate
        })
    }

    componentDidMount() {
        this.setState({
            viewport: {longitude: this.props.brewery.longitude, latitude: this.props.brewery.latitude, zoom: 13},
        })
    }

    handleEdit = () => {
        this.props.handleEdit(this.props.brewery)
    }


    render(){
        console.log(this.props.notes)
        const { brewery } = this.props
        const mapboxToken = 'pk.eyJ1IjoiZGF2ZWhvbG1lczg4IiwiYSI6ImNrOG5yYjY1MDExZnYzbHBoMHpvMGF5amkifQ.dsX_hdTiU-7GeB3vvGbS6Q'
        return(
            <div class='container'>
                <div class='row'>
                    <div class='col-md-6'>
                <ReactMapGL {...this.state.viewport}
                    mapboxApiAccessToken={mapboxToken}
                    mapboxStyle='mapbox://styles/daveholmes88/ck8yhbgr259vz1itbn285ffo0'
                    width="38vw"
                    height="90vh"
                    onViewportChange={viewport => this.setState({viewport})}>
                    <Marker key={brewery.id} longitude={parseFloat(brewery.longitude)} latitude={parseFloat(brewery.latitude)} >
                        <button class='marker-btn'>
                            <img src='../../beer-mug.png' alt='brewery icon'/>
                        </button>
                    </Marker>
                </ReactMapGL>
                </div>
                <div class='col-md-6'>
                <Card border='warning'>
                    <Card.Body>
                        <Card.Title><h1>{brewery.name}</h1></Card.Title>
                        <Card.Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Card.Text>
                        <a href={brewery.website} target='_blank' rel='noopener noreferrer'>{brewery.name}'s Website</a>
                        <Card.Text>{brewery.phone}</Card.Text>
                        {this.breweryRating() ? <p>Global Rating: {this.breweryRating()}</p> : null}
                        <div>
                            <div className="form-input rating">
                                <label htmlFor="rating">Your Rating:</label>
                                <StarRating
                                    numberOfStars="5"
                                    currentRating={this.props.number}
                                    onClick={this.props.setRating}
                                />
                            </div>
                            <div className="form-input">
                                <label htmlFor="description"></label>
                                <textarea
                                    name="notes"
                                    id="notes"
                                    onChange={this.props.noteChange}
                                    value={this.props.notes}
                                />
                            </div>
                            <div className="actions">
                                <Button type="submit" onClick={this.props.saveRating} variant='primary'>
                                    Submit Rating
                                </Button>
                            </div> 
                            <br></br>
                            <Link to='edit'>
                                <Button onClick={this.handleEdit}>Edit Brewery</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                </div>
                </div>
            </div>         
        )
    }
}

export default BreweryShow