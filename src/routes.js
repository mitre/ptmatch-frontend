import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import MatchingSystems from './containers/MatchingSystems';

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="/MatchingSystems" component={MatchingSystems} />
    <Route path="/RecordSets" component={Dashboard} />
  </Route>
);
