import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchContexts, selectContext, createContext } from '../actions/context';
import { fetchRecordSetsIfNeeded } from '../actions/recordSet';
import { fetchRMSIfNeeded } from '../actions/recordMatchingSystems';
import { fetchMatchRuns } from '../actions/matchRun';
import contextProps from '../prop-types/context';
import recordSetProps from '../prop-types/record_set';
import recordMatchingSystemProps from '../prop-types/record_matching_system';
import { runProps } from '../prop-types/run';

import ChallengeContext from './ChallengeContext';
import BenchmarkContext from './BenchmarkContext';
import ContextList from '../components/ContextList';
import PageHeader from '../components/Header/PageHeader';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">

      <PageHeader title="Dashboard" />
      <div className="row">
        <div className="col-md-12">
          <ContextList {...this.props}
                       selector={this.props.selectContext}
                       contextCreator={this.props.createContext}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {this.selectedChallengeContexts().map((context) => {
              return (<ChallengeContext context={context} key={context.id} />);
          })}

          {this.selectedBenchmarkContexts().map((context) => {
            return (<BenchmarkContext context={context} key={context.id} />);
          })}
        </div>
      </div>
      </div>
    );
  }

  selectedChallengeContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'challenge');
  }

  selectedBenchmarkContexts() {
    return _.values(this.props.contexts).filter((c) => c.selected === true && c.type === 'benchmark');
  }

  componentWillMount() {
    this.props.fetchContexts();
    this.props.fetchRecordSetsIfNeeded();
    this.props.fetchRMSIfNeeded();
    this.props.fetchMatchRuns();
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
  fetchContexts: PropTypes.func,
  fetchRecordSetsIfNeeded: PropTypes.func,
  fetchRMSIfNeeded: PropTypes.func,
  selectContext: PropTypes.func,
  createContext: PropTypes.func,
  fetchMatchRuns: PropTypes.func,
  contexts: PropTypes.objectOf(contextProps),
  recordSets: PropTypes.objectOf(recordSetProps),
  recordMatchingSystems: PropTypes.objectOf(recordMatchingSystemProps),
  matchRuns: PropTypes.objectOf(runProps)
};

function mapStateToProps(state) {
  return {contexts: state.contexts,
          recordSets: state.recordSets,
          recordMatchingSystems: state.recordMatchingSystems,
          matchRuns: state.matchRuns};
}

export default connect(mapStateToProps, { fetchContexts,
        fetchRecordSetsIfNeeded, fetchRMSIfNeeded, selectContext,
        createContext, fetchMatchRuns })(Dashboard);
