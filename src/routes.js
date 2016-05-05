import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import RecordSets from './containers/RecordSets';
import ResultExplorer from './containers/ResultExplorer';

export default (
  <Route component={App}>
    <Route path="/" component={ResultExplorer} />
    <Route path="/recordSets" component={RecordSets} />
  </Route>
);
