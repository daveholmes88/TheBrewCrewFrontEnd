import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BreweryCard extends Component {
    deleteBrewery = () => {
        const deleteObj = {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({id: this.props.brewery.id})
        }
        fetch(`http://localhost:3000/breweries/${this.props.brewery.id}`, deleteObj)
            .then(resp => resp.json())
            .then(breweries => console.log(breweries))
    }
    render(){
        const { brewery } = this.props
        return(
            <div>
                <h3 onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></h3>
                <p>{brewery.brewery_type}</p>
                <p>{brewery.address} {brewery.city}</p>
                <p>{brewery.state}, {brewery.zip}</p>
                <a href={brewery.website} target='_blank' rel='noopener noreferrer'>{brewery.name}'s Website</a>
                <p>{brewery.phone}</p>
                <button onClick={this.deleteBrewery}>Delete Brewery</button>
            </div>
        )
    }
}

export default BreweryCard