import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import BreweriesNearMe from './components/BreweriesNearMe'
import BrewerySearch from './components/BrewerySearch'
import BreweryShow from './components/BreweryShow'
import NewBrewery from './components/NewBrewery'
import Home from './components/Home'
import BrewNavbar from './components/Navbar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: '',
      ratings: [],
      breweries: [],
      showBrewery: {}
    //   id: 6179,
    //     name: "Off Color Brewing",
    //     brewery_type: "micro",
    //     address: "3925 W Dickens Ave",
    //     city: "Chicago",
    //     state: "Illinois",
    //     zip: 60647,
    //     country: "United States",
    //     longitude: -87.7253843735564,
    //     latitude: 41.9189269656549,
    //     phone: "",
    //     website: "http://www.offcolorbrewing.com"},
    //   search: null
     }
  }

  componentDidMount() {
    fetch('http://localhost:3000/breweries')
      .then(resp => resp.json())
      .then(data => {
        this.setState({breweries: data.breweries, ratings: data.ratings})
      })
      const token = localStorage.getItem('token')
      if (token) {
        const reqObj = {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        fetch('http://localhost:3000/users', reqObj)
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              currentUser: data
            })
          })
      }
  }

  breweryShow = brewery => {
    this.setState({
      showBrewery: brewery
    })
  }

  loginUser = (userObj) => {
    this.setState({
      currentUser: userObj
    })
  }

  handleHomeSearch = (location) => {
    this.setState({
      search: location
    })
  }

  refreshBrewery = (ratings) => {
    this.setState({
      ratings: ratings
    })
  }

  handleLogout = () => {
    this.setState({
      currentUser: ''
    })
    localStorage.clear()
  }
  
  render() {
    return (
      <Router>
        <div>
          <BrewNavbar handleLogout={this.handleLogout}/>
          <Switch >
          <Route exact path='/search' render={routerProps => <BrewerySearch {...routerProps} 
            search={this.state.search}
            breweries={this.state.breweries}
            breweryShow={this.breweryShow}/>}/>
          <Route exact path='/nearme' render={routerProps => <BreweriesNearMe {...routerProps} 
            breweryShow={this.breweryShow}/>}/>
          <Route exact path='/login' render={routerProps => <Login {...routerProps}
            loginUser={this.loginUser}/>} />
          <Route exact path='/show' render={routerProps => <BreweryShow {...routerProps}
            user={this.state.currentUser}
            ratings={this.state.ratings}
            brewery={this.state.showBrewery}
            refreshBrewery={this.refreshBrewery}/>}/>
          <Route exact path='/new' render={routerProps => <NewBrewery {...routerProps}
            breweryShow={this.breweryShow}/>} />
          <Route exact path='/home' render={routerProps => <Home {...routerProps}
            user={this.state.currentUser}
            ratings={this.state.ratings}
            breweries={this.state.breweries}
            handleHomeSearch={this.handleHomeSearch}
            breweryShow={this.breweryShow}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
