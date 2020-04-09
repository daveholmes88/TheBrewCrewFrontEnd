import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            myBreweries: [],
            myRatings: [],
            search: ''
        }
    }

    // findMyInfo = () => {
    //     const myRatings = this.props.ratings.filter(rating => {
    //         return this.props.user.id === rating.user_id
    //     })
    //     const breweryId = myRatings.map(rating => {
    //         return rating.brewery_id
    //     })
    //     const breweries = this.props.breweries.filter(brewery => {
    //         return breweryId.includes(brewery.id)
    //     })
    //     this.setState({
    //         myBreweries: breweries,
    //         myRatings: myRatings
    //     })
    // }

    renderBreweries = () => {
        const myRatings = this.props.ratings.filter(rating => {
            return this.props.user.id === rating.user_id
        })
        const breweryId = myRatings.map(rating => {
            return rating.brewery_id
        })
        const breweries = this.props.breweries.filter(brewery => {
            return breweryId.includes(brewery.id)
        })
        return breweries.map(brewery => {
            const rating = myRatings.filter(rating => rating.brewery_id === brewery.id)
            const allRatings = this.props.ratings.filter(rating => rating.brewery_id === brewery.id)
            const allNumbers = allRatings.map(rating => rating.number)
            const averageRating = allNumbers.reduce((a,b) => a + b, 0) / allNumbers.length
            return(
                <tr>
                    <td onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></td>
                    <td>{brewery.brewery_type}</td>
                    <td>{rating[0].number}</td>
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

    render() {
        return(
            <div>
                <Link to='/nearme' >
                    <button>Breweries Near Me</button>
                </Link>
                    <form onSubmit={this.handleSearch}>
                        <label>Location</label>
                        <input type='text' onChange={this.handleChange} value={this.state.search}/>
                        <input type='submit' />
                    </form>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>My Rating</th>
                        <th>Composite Rating</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                    </tr>
                        {this.renderBreweries()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home