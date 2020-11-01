import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PoolCreateStep from './components/PoolCreate';
import ViewPool from './components/ViewPool';
import history from './history';

import SignIn from './components/SignIn';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path = "/sign-in" component={SignIn}/>
                    <Route path = "/" exact component={Dashboard}/>
                    <Route path = "/create-pool" component={PoolCreateStep}/>
                    <Route path = "/pool" component={ViewPool}/>
                </Switch>
            </Router>
        )
    }
}
