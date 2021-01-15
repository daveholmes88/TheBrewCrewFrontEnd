import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from "react-router-dom";
import history from "./history";

export { default as Admin } from "./components/Admin";
export { default as BreweriesNearMe } from './components/BreweriesNearMe';
export { default as BrewerySearch } from './components/BrewerySearch';
export { default as BreweryShow } from './components/BreweryShow';
export { default as BrewNavbar } from './components/Navbar';
export { default as Login } from './components/Login';
export { default as ContactUs } from "./components/ContactUs";
export { default as Edit } from './components/Edit';
export { default as Home } from './components/Home';
export { default as NewBrewery } from './components/NewBrewery';
export { default as BreweryCard } from './components/BreweryCard';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
