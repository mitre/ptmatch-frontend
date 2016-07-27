import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/Dashboard';

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="/MatchingSystems" component={Dashboard} />
    <Route path="/RecordSets" component={Dashboard} />
  </Route>
);
