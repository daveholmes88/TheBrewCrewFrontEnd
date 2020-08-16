import React, { Component } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
// import { Link } from 'react-router-dom';
import { Card, Form, Button, Spinner, Container, Row, Col, Alert } from 'react-bootstrap';

import BreweryCard from './BreweryCard';
import { config } from "../Constants";

const API_Descriptions = config.url.API_Descriptions

class BreweriesNearMe extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {},
      searchAddress: '',
      breweries: [],
      selected: null,
      searchName: '',
      alert: false
    }
  }


  handleChange = event => {
    this.setState({
      searchAddress: event.target.value
    })
  }

  locationFetch = newLocation => {
    fetch(API_Descriptions, newLocation)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          this.setState({
            alert: true
          })
        } else {
          this.setState({
            breweries: data.breweries,
            viewport: {
              latitude: data.location[0],
              longitude: data.location[1],
              zoom: 13
            },
            searchName: '',
            alert: false
          })
        }
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
        location: this.state.searchAddress
      })
    }
    this.locationFetch(newLocation)
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
      this.locationFetch(newLocation)
    })
  }

  renderBreweries = () => {
    let breweries = this.state.breweries
    if (this.state.searchName) {
      breweries = breweries.filter(brewery => {
        return brewery.name.toLowerCase().includes(this.state.searchName.toLowerCase())
      })
    }
    return breweries.map(brewery => {
      return <Card border='warning' >
        <BreweryCard brewery={brewery}
          key={brewery.id}
          breweryShow={this.props.breweryShow}
          user={this.props.user} />
      </Card>
    })
  }

  renderMarkers = () => {
    return this.state.breweries.map(brewery => {
      return <Marker key={brewery.id} latitude={brewery.latitude} longitude={brewery.longitude}>
        <button class='marker-btn' onClick={() => this.setState({ selected: brewery })}>
          <img src='../../beer-mug.png' alt='brewery icon' />
        </button>
      </Marker>
    })
  }

  handleName = event => {
    this.setState({
      searchName: event.target.value
    })
  }

  render() {
    const mapboxToken = 'pk.eyJ1IjoiZGF2ZWhvbG1lczg4IiwiYSI6ImNrOG5yYjY1MDExZnYzbHBoMHpvMGF5amkifQ.dsX_hdTiU-7GeB3vvGbS6Q'
    const { viewport, selected } = this.state;
    return (
      <Container>
        {
          this.state.breweries.length === 0 ?
            <Spinner animation="border" role="status" variant='warning'>
              <span className="sr-only">Loading...</span>
            </Spinner> : null
        }
        <Row sm={2} >
          <Col id='left-container'>
            <br></br>
            <Form inline='true'>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control type='text' onChange={this.handleChange} value={this.state.searchAddress}></Form.Control>
              </Form.Group>
              <Button onClick={this.onSubmit} variant='primary' type='submit' value='Search'>Search</Button>
            </Form>
            {this.state.alert ? <Alert key='2' variant='warning'>Couldn't Find Location</Alert> : null}
            <ReactMapGL {...viewport}
              mapStyle='mapbox://styles/daveholmes88/ck8yhbgr259vz1itbn285ffo0'
              mapboxApiAccessToken={mapboxToken}
              width="100%"
              height="100vh"
              onViewportChange={viewport => this.setState({ viewport })}>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
              {this.state.breweries.length > 0 ? this.renderMarkers() : null}
              {this.state.selected ?
                <Popup
                  latitude={selected.latitude}
                  longitude={selected.longitude}
                  onClose={() => this.setState({ selected: null })}>
                  {selected.name}
                </Popup> : null}
            </ReactMapGL>
          </Col>
          <Col id='right-container' scrollable='true'>
            <Form inline='true'>
              <Form.Label>Filter Results</Form.Label>
              <Form.Control type='text' placeholder='Brewery Name' onChange={this.handleName} value={this.state.searchName}></Form.Control>
            </Form>
            <br></br>
            {this.state.breweries.length > 0 ? this.renderBreweries() : null}
          </Col>

        </Row >
      </Container >
    );
  }
}

export default BreweriesNearMe