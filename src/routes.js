import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import RecordMatchingSystems from './containers/RecordMatchingSystems';

export default (
  <Route component={App}>
    <Route path="/" component={RecordMatchingSystems} />
  </Route>
);
