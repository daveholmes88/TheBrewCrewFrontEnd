import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import StarRating from './StarRating.jsx';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            myBreweries: [],
            myRatings: [],
            search: '',
            searchName: null
        }
    }

    renderBreweries = () => {
        const myRatings = this.props.ratings.filter(rating => {
            return this.props.user.id === rating.user_id
        })
        const breweryId = myRatings.map(rating => {
            return rating.brewery_id
        })
        let breweries = this.props.breweries.filter(brewery => {
            return breweryId.includes(brewery.id)
        })
        if (this.state.searchName) {
            breweries = breweries.filter(brewery => {
                return brewery.name.toLowerCase().includes(this.state.searchName.toLowerCase())
            })
        }
        return breweries.map(brewery => {
            const rating = myRatings.filter(rating => rating.brewery_id === brewery.id)
            const allRatings = this.props.ratings.filter(rating => rating.brewery_id === brewery.id)
            const allNumbers = allRatings.map(rating => rating.number)
            const averageRating = allNumbers.reduce((a,b) => a + b, 0) / allNumbers.length
            return(
                <tr key={brewery.id}>
                    <td onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></td>
                    <td>{brewery.brewery_type}</td>
                    <td><StarRating
                                    numberOfStars="5"
                                    currentRating={rating[0].number}
                                /></td>
                    <td>{averageRating}</td>
                    <td>{brewery.address}</td>
                    <td>{brewery.city}</td>
                    <td>{brewery.state}</td>
                </tr>
            )
        })
    }

    handleSearch = event => {
        event.preventDefault()
        this.props.handleHomeSearch(this.state.search)
        this.props.history.push('/search')
    }

    handleChange = event => {
        this.setState({
            search: event.target.value
        })
    }

    componentDidMount() {
        if (!localStorage.token) {
            this.props.history.push('/login')
        }
    }

    handleName = (event) => {
        this.setState({
          searchName: event.target.value
        })
      }

    render() {
        return(
            <div class='container'>
                <div class='row' >
                    <div class='col-sm-6' >
                <Link to='/nearme' >
                    <Button variant='primary'>Breweries Near Me</Button>
                </Link>
                    <Form inline='true'>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type='text' onChange={this.handleChange} value={this.state.search} placeholder='City or State'/>
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={this.handleSearch} >Search</Button>
                    </Form>
                    </div>
                    <div class='col-sm-6' >
                        <br></br>
                        <Form inline='true'>
                            <Form.Label>Brewery Name</Form.Label>
                            <Form.Control type='text' placeholder='Brewery Name' onChange={this.handleName} value={this.state.name}></Form.Control>
                        </Form>
                    </div>
                </div>
                <Table variant='light' bordered='true' style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>My Rating</th>
                            <th>Global Rating</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                        {this.renderBreweries()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Home