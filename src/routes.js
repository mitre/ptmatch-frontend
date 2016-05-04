import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import RecordMatchingSystems from './containers/RecordMatchingSystems';
import RecordSets from './containers/RecordSets';

export default (
  <Route component={App}>
    <Route path="/" component={RecordMatchingSystems} />
    <Route path="/recordSets" component={RecordSets} />
  </Route>
);
