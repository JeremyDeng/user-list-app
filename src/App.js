import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Add from "./components/add.js";
import Edit from "./components/edit.js";
import Home from "./components/home.js";

class App extends Component {
  render() { 
    return (
      <BrowserRouter>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">User List App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">User List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link">Add new user</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
