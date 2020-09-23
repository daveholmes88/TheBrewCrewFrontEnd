import React, { Component } from "react";
import { Container, Table, Button } from 'react-bootstrap';

import { config } from "../Constants";

const API_Breweries = config.url.API_Breweries
const API_AdminNew = config.url.API_AdminNew
const API_Users = config.url.API_Users
const API_AdminEdits = config.url.API_AdminEdits

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            breweries: [],
            users: [],
            edits: []
        }
    }

    componentDidMount() {
        fetch(API_AdminNew)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    breweries: data.breweries,
                    users: data.users,
                    edits: data.edits,
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
                    <td class='text-center'><Button onClick={() => this.deleteNewBrewery(brewery)}>-</Button></td>
                </tr >
            )
        })
    }

    addBrewery = brewery => {
        const newObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brewery)
        }
        fetch(API_Breweries, newObj)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    deleteNewBrewery = brewery => {
        const deleteAdminNew = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: brewery.id })
        }
        fetch(`${API_AdminNew}/${brewery.id}`, deleteAdminNew)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    breweries: data
                }))
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
        const admin = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: user.id })
        }
        fetch(`${API_Users}/${user.id}`, admin)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    users: data.users
                })
            })
            .catch(err => console.log(err))
    }

    addEdit = event => {
        event.preventDefault()

    }

    renderEditBreweries = () => {
        return this.state.edits.map(brewery => {
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
                    <td class='text-center'><Button onClick={() => this.editBrewery(brewery)}>+</Button></td>
                    <td class='text-center'><Button onClick={() => this.deleteEditBrewery(brewery)}>-</Button></td>
                </tr >
            )
        })
    }

    editBrewery = (brewery) => {
        debugger
        const editBrewery = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brewery: brewery
            })
        }
        fetch(`${API_Breweries}/${brewery.brewery_id}`, editBrewery)
            .then(resp => resp.json())
            .then(data => this.setState({ edits: data }))
            .catch(err => console.log(err))
    }

    deleteEditBrewery = (brewery) => {
        const deleteObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: brewery.id })
        }
        fetch(`${API_AdminEdits}/${brewery.id}`, deleteObj)
            .then(resp => resp.json())
            .then(data => (
                this.setState({
                    edits: data
                })
            ))
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state)
        return (
            <Container>
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
                <h1>Edit Breweries</h1>
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
                        {this.renderEditBreweries()}
                    </tbody>
                </Table>
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
            </Container>
        )
    }
}

export default Admin