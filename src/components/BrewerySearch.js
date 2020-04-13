import React, { Component } from 'react'; 
import BreweryCard from './BreweryCard';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class BrewerySearch extends Component {
    constructor(){
        super()
        this.state = {
            search: null,
            name: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            search: event.target.parentElement.location.value.toLowerCase()
        })
    }

    renderBreweries = () => {
        let searchedBreweries
        if (this.state.search) {
            searchedBreweries = this.props.breweries.filter(brewery => {
                return brewery.city.toLowerCase() === this.state.search || brewery.state.toLowerCase() ===this.state.search
        })} else {
            searchedBreweries = this.props.breweries.filter(brewery => {
                return brewery.city.toLowerCase() === this.props.search.toLowerCase() || brewery.state.toLowerCase() ===this.props.search.toLowerCase()
        })}
        if (this.state.name) {
            searchedBreweries = searchedBreweries.filter(brewery => {
                return brewery.name.toLowerCase().includes(this.state.name.toLowerCase())
            })
        }
        return searchedBreweries.map(brewery => {
            return <BreweryCard brewery={brewery} 
                key={brewery.id}
                breweryShow={this.props.breweryShow}/>
        })
    }

    handleProps = () => {
        this.setState({
            search: this.props.search
        })
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        console.log(this.state.name)
        return (
            <div class='container'>
                <br></br>
                <div class='row'>
                    <div class='col-sm-6' >
                        <Form>
                            <Form.Group>
                                <Form.Label>Search Location</Form.Label>
                                <Form.Control type='text' placeholder='Enter City OR State' name='location'></Form.Control>
                            </Form.Group>
                            <Button onClick={this.handleSubmit} variant='primary' type='submit' value='Search'>Search</Button> 
                        </Form>
                    </div>
                    {this.state.search || this.props.search ? <div class='col-sm-6'>
                        <Form>
                            <Form.Label>Brewery Name</Form.Label>
                            <Form.Control type='text' placeholder='Brewery Name' onChange={this.handleName} value={this.state.name}></Form.Control>
                        </Form>
                    </div> : null}
                </div>
                <br></br>
                <br></br>
                <div class='row'>
                    {this.state.search || this.props.search ? this.renderBreweries() : null}
                </div>
                <br></br>
                {this.state.search || this.props.search ? <h4><Link to='/new'>Create A New Brewery</Link></h4> : null}
            </div>
        )
    }
}

export default BrewerySearch