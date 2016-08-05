import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';

import { fetchContexts } from '../actions/context';
import { fetchRecordSetsIfNeeded } from '../actions/recordSet';
import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';
import { fetchMatchRuns } from '../actions/matchRun';

class App extends Component {
  render() {
    const { children } = this.props; //eslint-disable-line
    return (
        <div className="container">
        <Header />
        {children}
        </div>
    );
  }

  componentWillMount() {
    this.props.fetchContexts();
    this.props.fetchRecordSetsIfNeeded();
    this.props.fetchRMSIfNeeded();
    this.props.fetchMatchRuns();
  }
}

App.propTypes = {
  fetchContexts: PropTypes.func,
  fetchRecordSetsIfNeeded: PropTypes.func,
  fetchRMSIfNeeded: PropTypes.func,
  fetchMatchRuns: PropTypes.func
};

App.displayName = 'App';

export default connect(null, { fetchContexts,
        fetchRecordSetsIfNeeded, fetchRMSIfNeeded, fetchMatchRuns })(App);
