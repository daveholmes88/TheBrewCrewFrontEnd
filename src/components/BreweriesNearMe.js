// import React, { Component, useState } from 'react'; 
// import ReactMapGL, { Marker } from 'react-map-gl';

// function BreweriesNearMe() {
//         const [viewport, setViewport] = useState({
//             width: 650,
//             height: 500,
//             latitude: 37.7577,
//             longitude: -122.4376,
//             zoom: 8
//           });
//           const mapboxToken = 'pk.eyJ1IjoiZGF2ZWhvbG1lczg4IiwiYSI6ImNrOG5yYjY1MDExZnYzbHBoMHpvMGF5amkifQ.dsX_hdTiU-7GeB3vvGbS6Q'
//         return (
//             <div>
//                 <ReactMapGL {...viewport}
//                     mapboxApiAccessToken={mapboxToken}
//                     onViewportChange={viewport => setViewport(viewport)}>markers
//                 </ReactMapGL>
//             </div>
//         )
// }

import React, { Component } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import { Link } from 'react-router-dom'

class BreweriesNearMe extends Component {
  constructor() {
    console.log(navigator.geolocation)
    super()
      this.state = {
      viewport: {}, 
      search: '',
      breweries: []
    }
  }
  

  handleChange = event => {
    this.setState({
        search: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const newLocation = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: this.state.search
      })
    }
    fetch('http://localhost:3000/descriptions', newLocation)
      .then(resp => resp.json())
      .then(data => 
        this.setState({
          breweries: data.breweries,
          viewport: {
            latitude: data.location[0],
            longitude: data.location[1],
            zoom: 10
          }
        }))
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      const newLocation = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: [latitude, longitude]
        })
      }
      fetch('http://localhost:3000/descriptions', newLocation)
        .then(resp => resp.json())
        .then(data => 
          this.setState({
              viewport: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              zoom: 10
              },
              breweries: data.breweries
            })) 
    })
  }

  renderBreweries = () => {
    return this.state.breweries.map(brewery => {
      return (
      <div>
        <h3 onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></h3>
        <p>{brewery.brewery_type}</p>
        <p>{brewery.address} {brewery.city}</p>
        <p>{brewery.state}, {brewery.zip}</p>
        <a href={brewery.website} target='_blank' rel='noopener noreferrer'>{brewery.name}'s Website</a>
        <p>{brewery.phone}</p>
      </div>
    )})
  }

  renderMarkers = () => {
    return this.state.breweries.map(brewery => {
      return <Marker latitude={brewery.latitude} longitude={brewery.longitude}>
        <div>{brewery.name}</div>
      </Marker>
    })
  }

  render() {
    const mapboxToken = 'pk.eyJ1IjoiZGF2ZWhvbG1lczg4IiwiYSI6ImNrOG5yYjY1MDExZnYzbHBoMHpvMGF5amkifQ.dsX_hdTiU-7GeB3vvGbS6Q'
    const {viewport} = this.state;
    console.log(this.props)
    return (
        <div>
        <form onSubmit={this.onSubmit}>
            <label>Address</label>
            <input type='input' onChange={this.handleChange} value={this.state.search}></input>
            <input type='submit' value='search' />

        </form>
      <ReactMapGL {...viewport}
        mapboxApiAccessToken={mapboxToken}
        width="50vw"
        height="50vh"
        onViewportChange={viewport => this.setState({viewport})}>
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        {this.state.breweries.length > 0 ? this.renderMarkers(): null}
      </ReactMapGL>
      {this.state.breweries.length > 0 ? this.renderBreweries() : null}
      {this.state.breweries.length > 0 ? <h3><Link to='/new'>Create A New Brewery</Link></h3>  : null}
      </div>
    );
  }
}

export default BreweriesNearMe