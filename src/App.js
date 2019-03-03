import React, {Component} from "react";
import {Route, Link, Router} from 'react-router-dom';
import Navigation from './Navigation.js';
import Clients from './Clients.js';
import Tasks from './Tasks.js';
import EditTask from './EditTask.js';
import EditClient from './EditClient.js';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    render() {
        return (
          <>
            <Navigation />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/tasks" component={Tasks} />
            <Route path="/tasks/edit" component={EditTask} />
            <Route path="/clients/edit" component={EditClient} />
          </>
        );
    }
}

export default App;
