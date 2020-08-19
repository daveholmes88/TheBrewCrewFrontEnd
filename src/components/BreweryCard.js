import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import { config } from "../Constants";

const API_Breweries = config.url.API_Breweries

class BreweryCard extends Component {

    deleteBrewery = () => {
        const deleteObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: this.props.brewery.id })
        }
        fetch(`${API_Breweries}/${this.props.brewery.id}`, deleteObj)
            .then(resp => resp.json())
            .then(breweries => console.log(breweries))
    }

    phonebrewery = phone => {
        let phoneArray = phone.split('')
        phoneArray.unshift('(')
        phoneArray.splice(4, 0, ')')
        phoneArray.splice(8, 0, '-')
        return < Card.Text class='text-center' > {phoneArray}</Card.Text >
    }

    render() {
        const { brewery, user } = this.props

        return (
            <Card.Body>
                <Card.Title class='text-center' onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></Card.Title>
                <Card.Text class='text-center'>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Card.Text>
                <a href={brewery.website} target='_blank' rel='noopener noreferrer'><Card.Text class='text-center'>{brewery.name}'s Website</Card.Text></a>
                {brewery.phone ? this.phonebrewery(brewery.phone) : null}
                {user.admin ? <Button variant='primary' onClick={this.deleteBrewery}>Delete Brewery</Button> : null}
            </Card.Body>
        )
    }
}

export default BreweryCard