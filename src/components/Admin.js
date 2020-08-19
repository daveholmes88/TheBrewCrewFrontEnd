import React, { Component } from "react";
import { Container, Table, Button } from 'react-bootstrap';

import { config } from "../Constants";

const API_Breweries = config.url.API_Breweries
const API_AdminNew = config.url.API_AdminNew

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            breweries: [],
            users: []
        }
    }

    componentDidMount() {
        fetch(API_AdminNew)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    breweries: data.breweries,
                    users: data.users
                })
            )
            .catch(err => console.log(err))
    }

    renderNewBreweries = () => {
        return this.state.breweries.map(brewery => {
            return (
                <tr key={brewery.id}>
                    <td>{brewery.name}</td>
                    <td class='text-center'>{brewery.brewery_type}</td>
                    <td class='text-center'>{brewery.address}</td>
                    <td class='text-center'>{brewery.city}</td>
                    <td class='text-center'>{brewery.state}</td>
                    <td class='text-center'>{brewery.zip}</td>
                    <td class='text-center'>{brewery.country}</td>
                    <td class='text-center'>{brewery.longitude}</td>
                    <td class='text-center'>{brewery.latitude}</td>
                    <td class='text-center'>{brewery.phone}</td>
                    <td class='text-center'>{brewery.website}</td>
                    <td class='text-center'><Button onClick={() => this.addBrewery(brewery)}>+</Button></td>
                    <td class='text-center'><Button onClick={() => this.deleteBrewery(brewery)}>-</Button></td>
                </tr >
            )
        })
    }

    addBrewery = brewery => {

    }

    deleteBrewery = brewery => {
        console.log('-------------------------')
    }

    renderUsers = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td class='text-center'>{user.email}</td>
                    {user.admin === false ? <td class='text-center'><Button onClick={() => this.makeAdmin(user)}>+</Button></td> : <td class='text-center'>ADMIN</td>}
                </tr>
            )
        })
    }

    makeAdmin = user => {
        console.log('++++++++++++++++++++++++++++++++++++')
    }

    render() {
        console.log(this.state)
        return (
            <Container>
                <h1>Users: {this.state.users.length}</h1>
                <Table variant='secondary' style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <th>UserName</th>
                            <th class='text-center'>Email</th>
                            <th class='text-center'>Make Admin</th>
                        </tr>
                        {this.renderUsers()}
                    </tbody>
                </Table>
                <h1>New Breweries</h1>
                <Table variant='secondary' style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th class='text-center'>Type</th>
                            <th class='text-center'>Address</th>
                            <th class='text-center'>City</th>
                            <th class='text-center'>State</th>
                            <th class='text-center'>Zip</th>
                            <th class='text-center'>Country</th>
                            <th class='text-center'>Longitude</th>
                            <th class='text-center'>Latitude</th>
                            <th class='text-center'>Phone</th>
                            <th class='text-center'>Website</th>
                            <th class='text-center'>Add</th>
                            <th class='text-center'>Delete</th>
                        </tr>
                        {this.renderNewBreweries()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Admin