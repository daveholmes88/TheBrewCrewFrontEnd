import React, { Component } from 'react'
import StarRating from './StarRating.jsx'
import ReactMapGL, { Marker } from "react-map-gl";

class BreweryShow extends Component {
    
    constructor(){
        super()
        this.state = {
            rate: false,
            rating: null,
            notes: '',
            viewport: {longitude: 0, latitude: 0, zoom: 10}
        }
    }

    breweryRating = () => {
        const breweryRatings = this.props.ratings.filter(rating => {
            return rating.brewery_id === this.props.brewery.id})
        const allNumbers = breweryRatings.map(rating => rating.number)
        const averageRating = allNumbers.reduce((a,b) => a + b, 0) / allNumbers.length
        return averageRating
    }

    setRating = (event) => {
        this.setState({
            rating: event
        })
    }

    noteChange = (event) => {
        this.setState({
            notes: event.target.value
        })
    }

    saveRating = () => {
        if (this.findRating()) {
            this.editRating()
        } else {
        if (this.state.rating) {
            const createObj = {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rating: this.state.rating,
                    notes: this.state.notes,
                    brewery_id: this.props.brewery.id,
                    user_id: this.props.user.id
                })
            }
            fetch('http://localhost:3000/ratings', createObj)
                .then(resp => resp.json())
                .then(ratings => {
                    this.setState({
                        rate: false,
                        rating: '',
                        notes: ''
                    })
                    this.props.refreshBrewery(ratings)
                    }) 
        }
        else { alert("You must rate a brewery in order to submit") }
    }}

    editRating = () => {
        const breweryRatings = this.props.ratings.filter(rating => {
            return rating.brewery_id === this.props.brewery.id})
        const myRating = breweryRatings.filter(rating =>{
            return rating.user_id === this.props.user.id
        })
        const Id = myRating[0].id
        const updateObj = {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: this.state.rating,
                notes: this.state.notes,
                brewery_id: this.props.brewery.id,
                user_id: this.props.user.id
            })
        }
        fetch(`http://localhost:3000/ratings/${Id}`, updateObj)
            .then(resp => resp.json())
            .then((ratings => {
                this.setState({
                    rate: false,
                    rating: '',
                    notes: ''
                })
                this.props.refreshBrewery(ratings)
                }))
    }

    handleRate = () => {
        this.setState({
            rate: !this.state.rate
        })
    }

    findRating = () => {
        const breweryRatings = this.props.ratings.filter(rating => {
            return rating.brewery_id === this.props.brewery.id})
        const myRating = breweryRatings.filter(rating =>{
            return rating.user_id === this.props.user.id
        })
        if (myRating.length > 0) { 
            return myRating[0].number 
        } 
    }

    componentDidMount() {
        if (this.props.brewery) {
            this.setState({
                viewport: {longitude: this.props.brewery.longitude, latitude: this.props.brewery.latitude, zoom: 10}
            })
        }
    }


    render(){
        console.log(this.props)
        const { brewery } = this.props
        const mapboxToken = 'pk.eyJ1IjoiZGF2ZWhvbG1lczg4IiwiYSI6ImNrOG5yYjY1MDExZnYzbHBoMHpvMGF5amkifQ.dsX_hdTiU-7GeB3vvGbS6Q'
        return(
            <div>
                <ReactMapGL {...this.state.viewport}
                    mapboxApiAccessToken={mapboxToken}
                    width="50vw"
                    height="50vh"
                    onViewportChange={viewport => this.setState({viewport})}>
                    <Marker longitude={parseFloat(brewery.longitude)} latitude={parseFloat(brewery.latitude)} >
                        <div>Brewery</div>
                    </Marker>
                </ReactMapGL>
                <h1>{brewery.name}</h1>
                <p>{brewery.brewery_type}</p>
                <p>{brewery.address} {brewery.city}</p>
                <p>{brewery.state}, {brewery.zip}</p>
                <a href={brewery.website} target='_blank' rel='noopener noreferrer'>{brewery.name}'s Website</a>
                <p>Composite Rating: {this.breweryRating()}</p>
                {this.findRating() ? <p>Your Rating: {this.findRating()}</p> : null}
                <br></br>
                <button onClick={this.handleRate}>Rate This Brewery</button>
                {this.state.rate ? 
                <div>
                <div className="form-input rating">
                    <label htmlFor="rating">Rating:</label>
                        <StarRating
                            numberOfStars="5"
                            currentRating="0"
                            onClick={this.setRating}
                        />
                </div>
                <div className="form-input">
                    <label htmlFor="description">Notes:</label>
                        <textarea
                            name="notes"
                            id="notes"
                            onChange={this.noteChange}
                            value={this.state.notes}
                        />
                </div>
                <div className="actions">
                    <button type="submit" onClick={this.saveRating}>
                        Submit Rating
                    </button>
                </div> 
                </div> : null}
            </div>         
        )
    }
}

export default BreweryShow