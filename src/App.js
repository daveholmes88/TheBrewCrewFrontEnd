import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import BreweriesNearMe from './components/BreweriesNearMe';
import BrewerySearch from './components/BrewerySearch';
import BreweryShow from './components/BreweryShow';
import NewBrewery from './components/NewBrewery';
import Home from './components/Home';
import BrewNavbar from './components/Navbar';
import Edit from './components/Edit';
import history from "./history";

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: '',
      ratings: [],
      breweries: [],
      showBrewery: {},
      search: null,
      rating: null,
      notes: '',
      number: 0,
      edit: {},
      ratingAlert: false
    }

  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userFetch(token)
    } else {
      this.breweryFetch()
    }
  }

  breweryFetch = () => {
    fetch('https://tranquil-earth-85240.herokuapp.com/breweries')
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          breweries: data.breweries,
          ratings: data.ratings
        })
      })
      .catch(err => console.log(err))
  }

  userFetch = token => {
    const reqObj = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('https://tranquil-earth-85240.herokuapp.com/users', reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          currentUser: data.user,
          breweries: data.breweries,
          ratings: data.ratings
        })
      })
      .catch(err => console.log(err))
  }

  breweryShow = brewery => {
    const rating = this.myRating(brewery)
    if (rating.length > 0) {
      this.setState({
        showBrewery: brewery,
        rating: rating[0],
        notes: rating[0].notes,
        number: rating[0].number
      })
    } else {
      this.setState({
        showBrewery: brewery,
        rating: null,
        notes: '',
        number: 0
      })
    }
    history.push('/show')
  }

  myRating = brewery => {
    const breweryRatings = this.state.ratings.filter(rating => {
      return rating.brewery_id === brewery.id
    })
    return breweryRatings.filter(rating => {
      return rating.user_id === this.state.currentUser.id
    })
  }

  loginUser = userObj => {
    this.setState({
      currentUser: userObj
    })
  }

  handleHomeSearch = location => {
    this.setState({
      search: location
    })
  }

  handleLogout = () => {
    this.setState({
      currentUser: ''
    })
    localStorage.clear()
  }

  setRating = event => {
    this.setState({
      number: event
    })
  }

  noteChange = event => {
    this.setState({
      notes: event.target.value
    })
  }

  saveRating = event => {
    event.preventDefault()
    if (this.state.number !== 0 && localStorage.token) {
      if (this.state.rating) {
        this.editRating()
      } else {
        this.createRating()
      }
    }
    else {
      this.setState({
        ratingAlert: true
      })
    }
  }

  createRating = () => {
    const createObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: this.state.number,
        notes: this.state.notes,
        brewery_id: this.state.showBrewery.id,
        user_id: this.state.currentUser.id
      })
    }
    fetch('https://tranquil-earth-85240.herokuapp.com/ratings', createObj)
      .then(resp => resp.json())
      .then(ratings => {
        this.setState({
          ratings: ratings
        })
        history.push('/home')
      })
  }

  editRating = () => {
    const updateObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: this.state.rating.id,
        number: this.state.number,
        notes: this.state.notes
      })
    }
    fetch(`https://tranquil-earth-85240.herokuapp.com/ratings/${this.state.rating.id}`, updateObj)
      .then(resp => resp.json())
      .then((ratings => {
        this.setState({
          ratings: ratings
        })
        history.push('/home')
      }))
      .catch(err => console.log(err))
  }

  handleEdit = brewery => {
    this.setState({
      edit: brewery
    })
  }

  handleEditChange = event => {
    this.setState({
      edit: {
        ...this.state.edit,
        [event.target.name]: event.target.value
      }
    })
  }

  editSubmit = event => {
    event.preventDefault()
    const editBrewery = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        brewery: this.state.edit
      })
    }
    fetch(`https://tranquil-earth-85240.herokuapp.com/breweries/${this.state.edit.id}`, editBrewery)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          showBrewery: data,
          edit: {}
        })
        history.push('/show')
      })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <BrewNavbar handleLogout={this.handleLogout}
            user={this.state.currentUser}
            breweries={this.state.breweries}
            breweryShow={this.breweryShow} />
          <Switch >
            <Route exact path='/search' render={routerProps => <BrewerySearch {...routerProps}
              search={this.state.search}
              breweries={this.state.breweries}
              breweryShow={this.breweryShow}
              user={this.state.currentUser} />} />
            <Route exact path='/' render={routerProps => <BreweriesNearMe {...routerProps}
              breweryShow={this.breweryShow} />} />
            <Route exact path='/login' render={routerProps => <Login {...routerProps}
              loginUser={this.loginUser} />} />
            <Route exact path='/show' render={routerProps => <BreweryShow {...routerProps}
              user={this.state.currentUser}
              ratings={this.state.ratings}
              brewery={this.state.showBrewery}
              refreshBrewery={this.refreshBrewery}
              rating={this.state.rating}
              setRating={this.setRating}
              noteChange={this.noteChange}
              saveRating={this.saveRating}
              number={this.state.number}
              notes={this.state.notes}
              handleEdit={this.handleEdit}
              ratingAlert={this.state.ratingAlert} />} />
            <Route exact path='/new' render={routerProps => <NewBrewery {...routerProps}
              breweryShow={this.breweryShow}
              user={this.state.currentUser} />} />
            <Route exact path='/home' render={routerProps => <Home {...routerProps}
              user={this.state.currentUser}
              ratings={this.state.ratings}
              breweries={this.state.breweries}
              handleHomeSearch={this.handleHomeSearch}
              breweryShow={this.breweryShow} />} />
            <Route exact path='/edit' render={routerProps => <Edit {...routerProps}
              brewery={this.state.edit}
              handleEditChange={this.handleEditChange}
              editSubmit={this.editSubmit}
              user={this.state.currentUser} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
