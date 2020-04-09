import React, { Component } from 'react'; 
import BreweryCard from './BreweryCard'
import { Link } from 'react-router-dom'

class BrewerySearch extends Component {
    constructor(){
        super()
        this.state = {
            search: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            search: event.target.search.value.toLowerCase()
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

    render() {
        console.log(this.props)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Search</label>
                    <input type='text' placeholder='search' name='search'></input>
                    <input type='submit' value='submit' />
                </form>
                {this.state.search || this.props.search ? this.renderBreweries() : null}
                {this.state.search || this.props.search ? <h3><Link to='/new'>Create A New Brewery</Link></h3> : null}
            </div>
        )
    }
}

export default BrewerySearch