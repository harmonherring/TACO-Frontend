import React, {Component} from "react";
import {Route, Link, Router} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Navigation} from './Navigation';
import Clients from './Clients.js';
import Tasks from './Tasks.js';
import AddTask from './AddTask.js';

import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    render() {
        return (
          <>
            <Navigation />
            <Route exact path="/clients" component={Clients} />
            <Route path="/tasks/add" component={AddTask} />
            <Route exact path="/tasks" component={Tasks} />
          </>
        );
    }
}

export default App;
