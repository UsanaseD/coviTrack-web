import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/js/all';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

// components for routing
import Landing from './components/Landing';
import Guides from './components/guides/guides';
import AllCases from './components/allCases/allCases';
import FollowedCountries from './components/FollowedCountries';
import './App.css';
import './responsive.css';



function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/new" component={Guides} />
          <Route exact={true} path="/guides" component={Guides} />
          <Route exact={true} path="/followed-countries" component={FollowedCountries} />
          <Route exact={true} path="/all-cases/:page" component={AllCases} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default withNamespaces()(App);