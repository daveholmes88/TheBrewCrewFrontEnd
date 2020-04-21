import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';

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
        <div class='container-fluid d-flex align-items-center col-sm-6 col-md-3 overflow-auto'>
            <Card border='warning' style={{ height: '15rem', width: '18rem' }}>
                <Card.Body>
                    <Card.Title class='text-center' onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></Card.Title>
                    <Card.Text class='text-center'>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Card.Text>
                    <a href={brewery.website} target='_blank' rel='noopener noreferrer'><Card.Text class='text-center'>Website</Card.Text></a>
                    <Card.Text class='text-center'>{brewery.phone}</Card.Text>
                    {/* <button onClick={this.deleteBrewery}>Delete Brewery</button> */}
                </Card.Body>
            </Card>
        </div>
    )
    }
}

export default BreweryCard