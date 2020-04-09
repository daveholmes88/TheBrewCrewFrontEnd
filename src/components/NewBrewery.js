import React, { Component } from 'react'; 

class NewBrewery extends Component {
    constructor() {
        super()
        this.state = {
            name: 'Brewery Dave',
            kind: 'micro', 
            address: '4805 N Wolcott ave', 
            city: 'Chicago', 
            state: 'Illinois',
            postal_code: '60640', 
            country: 'United States', 
            website: 'www.thisisawebsite.com', 
            phone_number: '8475283167' 
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

    render() {
        return(
            <div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <label>Name:</label>
                    <input name='name' type='text' value={this.state.name}></input>
                    <br></br>
                    <label>Kind</label>
                    <input name = 'kind' type='text' value={this.state.kind}></input>
                    <br></br>
                    <label>Address</label>
                    <input name='address' type='text' value={this.state.address}></input>
                    <br></br>
                    <label>City</label>
                    <input name='city' type='text' value={this.state.city}></input>
                    <br></br>
                    <label>State</label>
                    <input name='state' type='text' value={this.state.state}></input>
                    <br></br>
                    <label>Postal Code</label>
                    <input name='postal_code' type='text' value={this.state.postal_code}></input>
                    <br></br>
                    <label>Country</label>
                    <input name='country' type='text' value={this.state.country}></input>
                    <br></br>
                    <label>Website</label>
                    <input name='website' type='text' value={this.state.website}></input>
                    <br></br>
                    <label>Phone Number</label>
                    <input name='phone_number' type='text' value={this.state.phone_number}></input>
                    <br></br>
                    <input type='submit' value='Add Brewery' />
                </form>
            </div>
        )
    }
}

export default NewBrewery